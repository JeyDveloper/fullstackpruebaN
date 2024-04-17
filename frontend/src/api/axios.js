import axios from "axios"; // Se importa axios para realizar las peticiones al servidor

//Se import la url de la API a través de una variable de entorno
const URL = import.meta.env.VITE_BACKEND_URL;

//se pasa la ruta a axios para que las peticiones la dirija a la API
const instance = axios.create({
  baseURL: `${URL}/api`,
});

export default instance;
