import express from 'express';
import { port } from './config.js';
import solicitudRoutes from './routes/solicitud.routes.js';
import cuentasRoutes from './routes/cuentas.routes.js';
import cors from 'cors'; 

const app = express();

app.use(cors());  
app.use(express.json());  // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear datos de formularios
app.use(solicitudRoutes);
app.use(cuentasRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
