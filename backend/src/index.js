import app from './app.js' // se importa la configuración del servidor

app.listen(process.env.PORT)//se le especifica el puerto al servidor
console.log(`server running`)