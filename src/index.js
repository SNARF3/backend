import express from 'express';
import { port } from './config.js';
import solicitudRoutes from './routes/solicitud.routes.js';
import cuentasRoutes from './routes/cuentas.routes.js';
import cors from 'cors';  // Importar el paquete CORS

const app = express();

app.use(cors());  // Habilitar CORS
app.use(express.json());  // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear datos de formularios

// Comprobación básica
app.get('/', (req, res) => {
    res.send('Servidor está corriendo');
});

// Usar las rutas para solicitudes y cuentas
app.use(solicitudRoutes);
app.use(cuentasRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
