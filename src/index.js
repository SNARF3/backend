import express from 'express';
import {port} from './config.js';
import solicitudRoutes from "./routes/solicitud.routes.js"

const app = express();
app.use(solicitudRoutes);
app.listen(port);
console.log("server on port ", port);


