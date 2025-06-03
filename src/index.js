import express from 'express';
import { port } from './config.js';
import solicitudRoutes from './routes/solicitud.routes.js';
import cuentasRoutes from './routes/cuentas.routes.js';
import formularioRouter from './routes/formulario.routes.js'
import cors from 'cors'; 
import bodyParser from 'body-parser';
import proyectosRouter from './routes/proyectos.routes.js'
import calendarioRouter from './routes/calendario.routes.js';
import revisionesRouter from './routes/revisiones.routes.js';
import perfilRouter from './routes/perfil.routes.js';
import modeladoUMLRouter from './routes/modeladoUML.routes.js';
import marcoteoricoRouter from './routes/marcoTeorico.routes.js';
import metodologiaVidaUtilRouter from './routes/metodologiaVidautil.routes.js';
import bdModeloC4Router from './routes/bdModeloC4.routes.js';
import analisisPreliminarRouter from './routes/analisisPreliminar.routes.js';
import diagramasRouter from './routes/diagramas.routes.js';

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  
app.use(express.json());  // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true }));  // Middleware para parsear datos de formularios
app.use(solicitudRoutes);
app.use(cuentasRoutes);
app.use(formularioRouter);
app.use(proyectosRouter);
app.use(calendarioRouter);
app.use(revisionesRouter);
app.use(perfilRouter);
app.use(modeladoUMLRouter);
app.use(marcoteoricoRouter);
app.use(metodologiaVidaUtilRouter);
app.use(bdModeloC4Router);
app.use(analisisPreliminarRouter);
app.use(diagramasRouter);

// Iniciar el servidor
app.listen(port)
console.log("server on port ", port);