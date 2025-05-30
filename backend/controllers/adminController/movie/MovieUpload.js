const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { supabase } = require("../../../config/suppabase");
const AdmZip = require("adm-zip");
const crypto = require("crypto");

// Multer setup for memory storage, accept only zip files
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 * 1024 }, // 10 GB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/zip" || file.mimetype === "application/x-zip-compressed") {
      cb(null, true);
    } else {
      cb(new Error("Only zip files are allowed"));
    }
  },
}).single("file");

// Helper function to recursively get all files in a directory
const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
};

const allowedExtensions = [".m3u8", ".ts", ".vtt", ".webp"];

const movieUpload = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Please upload a zip file" });
      }

      // Extract zip buffer to backend/temp/ with a unique folder name
      const tempDir = path.join(__dirname, "../../../temp");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const uniqueFolderName = crypto.randomBytes(8).toString("hex");
      const extractPath = path.join(tempDir, uniqueFolderName);
      fs.mkdirSync(extractPath);

      const zip = new AdmZip(file.buffer);
      zip.extractAllTo(extractPath, true);

      // Get all extracted files
      const extractedFiles = getAllFiles(extractPath);

      // Filter files by allowed extensions
      const filesToUpload = extractedFiles.filter(f => allowedExtensions.includes(path.extname(f).toLowerCase()));

      if (filesToUpload.length === 0) {
        return res.status(400).json({ error: "No valid media files found in the zip" });
      }

      // Upload files to Supabase in parallel
      const bucket = "hls"; // Use bucket "hls" as per user instruction

      const uploadPromises = filesToUpload.map(async (filePath) => {
        const fileBuffer = fs.readFileSync(filePath);
        // Create a relative path inside the zip folder to preserve structure
        const relativePath = path.relative(extractPath, filePath).replace(/\\/g, "/");

        // Extract the top-level folder name (movie title) from the relative path
        const pathSegments = relativePath.split("/");
        const movieTitle = pathSegments.length > 1 ? pathSegments[0] : uniqueFolderName;

        // Construct the path inside the movie folder preserving subfolders and filename
        const subPath = pathSegments.slice(1).join("/");

        // Generate a safe filename with random suffix to avoid collisions
        const ext = path.extname(relativePath);
        const baseName = path.basename(relativePath, ext);
        const randomStr = crypto.randomBytes(6).toString("hex");

        // Determine folder based on file extension
        const folder = [".m3u8", ".ts", ".vtt"].includes(ext) ? "hls" : ext === ".webp" ? "poster" : "others";

        // Upload path under {folder}/movies/{movieTitle}/{subPath or baseName_random.ext}
        const supabasePath = subPath
          ? `${folder}/movies/${movieTitle}/${subPath}`
          : `${folder}/movies/${movieTitle}/${baseName}_${randomStr}${ext}`;

        const { error } = await supabase.storage
          .from(bucket)
          .upload(supabasePath, fileBuffer, {
            contentType: getContentType(ext),
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw new Error(`Failed to upload ${relativePath}: ${error.message}`);
        }

        // Get public URL
        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(supabasePath);

        return {
          originalPath: relativePath,
          supabasePath,
          publicUrl: publicData.publicUrl,
        };
      });

      let uploadResults;
      try {
        uploadResults = await Promise.all(uploadPromises);
      } catch (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }

      // Optionally, clean up extracted files after upload
      fs.rmSync(extractPath, { recursive: true, force: true });

      res.status(200).json({
        success: true,
        message: "Files uploaded successfully",
        data: uploadResults,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper to get content type based on file extension
function getContentType(ext) {
  switch (ext) {
    case ".m3u8":
      return "application/vnd.apple.mpegurl";
    case ".ts":
      return "video/mp2t";
    case ".vtt":
      return "text/vtt";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

module.exports = { movieUpload };
