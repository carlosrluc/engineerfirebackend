import multer from 'multer';
import path from 'path';
import fs from 'fs';

// --- Validar existencia de carpetas ---
const uploadDirs = ['./uploads/fotos', './uploads/cvs'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// --- Configuración general ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'foto') cb(null, 'uploads/fotos');
    else if (file.fieldname === 'cv') cb(null, 'uploads/cvs');
    else cb(new Error('Campo de archivo no válido'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'foto') {
    // Aceptar solo imágenes
    const allowed = /jpeg|jpg|png|gif/;
    allowed.test(path.extname(file.originalname).toLowerCase())
      ? cb(null, true)
      : cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
  } else if (file.fieldname === 'cv') {
    // Aceptar solo PDF o Word
    const allowed = /pdf|doc|docx/;
    allowed.test(path.extname(file.originalname).toLowerCase())
      ? cb(null, true)
      : cb(new Error('Solo se permiten archivos PDF o Word'));
  } else {
    cb(new Error('Campo de archivo no válido'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
