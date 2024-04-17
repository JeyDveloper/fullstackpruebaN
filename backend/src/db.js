import pg from "pg"; //Se importa el módulo de posgtre

//Se importan las variables de entorno
import { DB_HOST, DATABASE, DB_USER, DB_PASSWORD, DB_PORT } from "./config.js";

//se crea la conexión a la base de datos
export const pool = new pg.Pool({
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
