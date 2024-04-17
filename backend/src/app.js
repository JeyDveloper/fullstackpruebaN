import express from "express";
import cors from "cors";
import morgan from "morgan";

//Se importa la variable que contiene la url del front para permitir realizar peticiones
import { FRONTEND_URL } from "./config.js";

//Se importan las rutas
import customersRoutes from "./routes/customers.routes.js";

const app = express();

//Se añade la ruta del front al cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(morgan("dev")); // muestras las consultas realizadas
app.use(express.json()); // Se valida que se puedan compartir objetos json o de clave-valor
app.use("/api", customersRoutes); //se añade las rutas para hacer las consultas al servidor

//Se validan todos los errores que puede ocacionar cualquiera de las consultas
app.use((err, req, res, next) => {
  return res.json({ error: err.message });
});

export default app;
