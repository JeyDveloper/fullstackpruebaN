import app from './app.js' // se importa la configuración del servidor
import { PORT } from './config.js' // se importa la variable que contiene el puerto de la ruta

app.listen(process.env.PORT)//se le especifica el puerto al servidor
console.log(`server running`)