import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Usamos __dirname para la ruta relativa
    cb(null, path.join(__dirname, "../../pdf")); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

// Filtro para aceptar solo archivos PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error("Solo se permiten archivos PDF"), false); // Rechaza otros archivos
  }
};

// Middleware de Multer
export const upload = multer({
  storage,
  fileFilter,
});
