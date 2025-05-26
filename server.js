const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Setup storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Serve frontend
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload route
app.post('/upload', upload.array('files'), (req, res) => {
  res.json({ files: req.files.map(file => ({
    filename: file.filename,
    path: `/uploads/${file.filename}`
  })) });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
