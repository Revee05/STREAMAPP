const multer = require('multer');
const { supabase } = require('../../config/suppabase');
const path = require('path');
const crypto = require('crypto');

// File filter to accept only images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'));
  }
};

// Use memory storage to get file buffer for upload to Supabase
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1000 * 1000 * 100 } // 100MB limit
}).single('media');

const uploadMedia = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const fileExt = path.extname(req.file.originalname);
      const fileName = crypto.randomBytes(16).toString('hex') + fileExt;
      const fileBuffer = req.file.buffer;

      const { data, error } = await supabase.storage
        .from('upload')
        .upload(fileName, fileBuffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: req.file.mimetype,
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { publicURL, error: urlError } = supabase.storage
        .from('upload')
        .getPublicUrl(fileName);

      if (urlError) {
        throw urlError;
      }

      res.status(200).json({
        message: 'File uploaded successfully',
        file: {
          fileName,
          publicURL,
          mimetype: req.file.mimetype,
          size: req.file.size,
        },
      });
    } catch (uploadError) {
      res.status(500).json({ message: uploadError.message });
    }
  });
};

module.exports = { uploadMedia };
