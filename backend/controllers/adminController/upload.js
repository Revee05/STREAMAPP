const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const { supabase } = require("../../config/suppabase");

// Konfigurasi multer dengan memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Batas 50MB
  fileFilter: function (req, file, cb) {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
}).single("file");

const uploadMedia = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Please upload a file" });
      }

      // Ambil bagian nama file tanpa ekstensi
      const originalName = path.parse(file.originalname).name;
      const fileExt = path.extname(file.originalname);
      const safeName = originalName.substring(0, 50); // Batas 50 karakter agar aman

      // Generate nama random
      const randomStr = crypto.randomBytes(6).toString("hex");

      // Gabungkan jadi nama file akhir
      const fileName = `${safeName}_${randomStr}${fileExt}`;

      // Gunakan bucket bernama "upload"
      const bucket = "upload";

      // Upload ke Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // Ambil public URL
      const { data: publicData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      res.status(200).json({
        success: true,
        data: {
          fileName,
          publicUrl: publicData.publicUrl,
          fileType: file.mimetype,
          size: file.size,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadMedia };
