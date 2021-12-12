const express = require('express')
const path = require('path')
const app = express();
const puerto = 8080;



const  Contenedor = require('./Contenedor.js');
let contenedor = new Contenedor('./productos.txt');

const server =  app.listen(puerto, () => (console.log(`Servidor escuchando en el puerto ${puerto}`)))


server.on("error", error => console.log("Ha ocurrido un error con el servidor"))

 app.get("/", (req,res) => {
      res.send('raiz del servidor')
 })

 app.get("/productos", (req,res) => {
    const productos = contenedor.getAll()
    .then((productos) => res.send(productos))
    .catch(() => console.log("Error al buscar los articulos"))
    
 })

 app.get("/productoRandom", (req,res) => {
    const productos = contenedor.getAll()
    .then((productos) => {
        let id = Math.floor(Math.random() * productos.length) + 1;
        const productoAzar = contenedor.getById(id)
        .then((productoAzar) => res.send(productoAzar))
    })
    
    
 })