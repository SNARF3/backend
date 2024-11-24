import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determinar la carpeta según el campo del archivo
    let folder = "otros"; // Carpeta predeterminada
    if (file.fieldname === "proyectoTrabajo") {
      folder = "cartas";
    } else if (file.fieldname === "detallePropuesta") {
      folder = "propuestas";
    }

    // Ruta absoluta al destino
    const destinationPath = path.join(__dirname, "../../pdf", folder);

    // Verificar si la carpeta existe; si no, crearla
    fs.mkdirSync(destinationPath, { recursive: true });

    // Configurar el destino
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // Generar un nombre único para el archivo
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Filtro para aceptar solo archivos PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error("Solo se permiten archivos PDF"), false); // Rechaza otros tipos de archivos
  }
};

// Middleware de Multer
export const upload = multer({
  storage, // Configuración de almacenamiento
  fileFilter, // Filtro para validar el tipo de archivo
});
