const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { supabase } = require("../../../config/suppabase");
const AdmZip = require("adm-zip");
const crypto = require("crypto");
const { sequelize } = require("../../../config/sequelize");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 * 1024 }, // 10 GB
  fileFilter(req, file, cb) {
    if (file.mimetype === "application/zip" || file.mimetype === "application/x-zip-compressed") {
      cb(null, true);
    } else {
      cb(new Error("Only zip files are allowed"));
    }
  },
}).single("file");

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
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
      if (err) return res.status(400).json({ error: err.message });

      const file = req.file;
      if (!file) return res.status(400).json({ error: "Please upload a zip file" });

      const tempDir = path.join(__dirname, "../../../temp");
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

      const uniqueFolderName = crypto.randomBytes(8).toString("hex");
      const extractPath = path.join(tempDir, uniqueFolderName);
      fs.mkdirSync(extractPath);

      const zip = new AdmZip(file.buffer);
      zip.extractAllTo(extractPath, true);

      const extractedFiles = getAllFiles(extractPath);

      const filesToUpload = extractedFiles.filter((f) =>
        allowedExtensions.includes(path.extname(f).toLowerCase())
      );

      if (filesToUpload.length === 0) {
        return res.status(400).json({ error: "No valid media files found in the zip" });
      }

      const bucket = "hls";

      const uploadPromises = filesToUpload.map(async (filePath) => {
        const fileBuffer = fs.readFileSync(filePath);
        const relativePath = path.relative(extractPath, filePath).replace(/\\/g, "/");
        const pathSegments = relativePath.split("/");

        const movieTitle = pathSegments.length > 1 ? pathSegments[0] : uniqueFolderName;
        const ext = path.extname(relativePath);
        const baseName = path.basename(relativePath, ext);
        const randomStr = crypto.randomBytes(6).toString("hex");

        // Tentukan folder prefix berdasarkan jenis file
        // .webp → prefix 'poster/'
        // lainnya (.m3u8, .ts, .vtt) → prefix 'hls/'
        let folderPrefix;
        if (ext === ".webp") {
          folderPrefix = "poster";
        } else {
          folderPrefix = "hls";
        }

        // Ambil sub-path setelah movieTitle
        const sliced = pathSegments.slice(1);

        // Jika .webp dan folder pertama adalah 'poster', hilangkan folder 'poster' supaya path upload tidak double
        let subPath;
        if (ext === ".webp" && sliced[0] === "poster") {
          subPath = sliced.slice(1).join("/");
        } else {
          subPath = sliced.join("/");
        }

        // Jika tidak ada subPath, buat filename acak supaya tidak collision
        const supabasePath = subPath
          ? `${folderPrefix}/movies/${movieTitle}/${subPath}`
          : `${folderPrefix}/movies/${movieTitle}/${baseName}_${randomStr}${ext}`;

        const { error } = await supabase.storage.from(bucket).upload(supabasePath, fileBuffer, {
          contentType: getContentType(ext),
          cacheControl: "3600",
          upsert: false,
        });

        if (error) throw new Error(`Failed to upload ${relativePath}: ${error.message}`);

        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(supabasePath);

        return {
          originalPath: relativePath,
          supabasePath,
          publicUrl: publicData.publicUrl,
        };
      });

      // Cari metadata.json dalam file yang diekstrak
      const metadataFile = extractedFiles.find(f => 
        path.basename(f).toLowerCase() === 'metadata.json'
      );

      if (!metadataFile) {
        return res.status(400).json({ error: "metadata.json not found in zip" });
      }

      // Baca dan parse metadata
      const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));

      // Upload files ke Supabase seperti sebelumnya
      let uploadResults;
      try {
        uploadResults = await Promise.all(uploadPromises);
        
        // Cari URL poster dari hasil upload
        const posterUrl = uploadResults.find(r => r.supabasePath.includes('poster'))?.publicUrl;
        // Cari URL playlist m3u8 dari hasil upload
        const filmsUrl = uploadResults.find(r => r.originalPath.endsWith('.m3u8'))?.publicUrl;

        // Generate slug dari title
        const slug = metadata.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

        // Insert ke database
        const [film] = await sequelize.query(`
          INSERT INTO films (
            title, description, poster_url, release_year, 
            release_month, release_day, films_url, slug
          ) VALUES (
            :title, :description, :posterUrl, :releaseYear,
            :releaseMonth, :releaseDay, :filmsUrl, :slug
          ) RETURNING id
        `, {
          replacements: {
            title: metadata.title,
            description: metadata.description,
            posterUrl,
            releaseYear: metadata.release_year,
            releaseMonth: metadata.release_month,
            releaseDay: metadata.release_day,
            filmsUrl,
            slug
          },
          type: sequelize.QueryTypes.INSERT
        });

        // Insert genres
        if (metadata.genres && metadata.genres.length > 0) {
          for (const genreName of metadata.genres) {
            // Insert genre if not exists
            await sequelize.query(`
              INSERT INTO genres (name)
              VALUES (:name)
              ON CONFLICT (name) DO NOTHING
            `, {
              replacements: { name: genreName }
            });

            // Get genre id
            const [genre] = await sequelize.query(`
              SELECT id FROM genres WHERE name = :name
            `, {
              replacements: { name: genreName },
              type: sequelize.QueryTypes.SELECT
            });

            // Insert film_genres relation
            await sequelize.query(`
              INSERT INTO film_genres (film_id, genre_id)
              VALUES (:filmId, :genreId)
            `, {
              replacements: {
                filmId: film.id,
                genreId: genre.id
              }
            });
          }
        }

      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

      fs.rmSync(extractPath, { recursive: true, force: true });

      res.status(200).json({
        success: true,
        message: "Film uploaded successfully with metadata",
        data: uploadResults
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
