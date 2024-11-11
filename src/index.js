import express from 'express';
import {port} from './config.js';
import solicitudRoutes from "./routes/solicitud.routes.js"
import cors from 'cors'

const app = express();
app.use(cors());
app.use(solicitudRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.listen(port);
console.log("server on port ", port);


