const express = require("express"),
    path = require("path"),
    app = express(),
    puerto = 3000;

app.get('/', (peticion, respuesta) => {
    let agenteDeUsuario = peticion.header("user-agent");
    respuesta.send(" " + agenteDeUsuario);
});


app.get('/hola', (peticion, respuesta) => {
    let mascota = {
        nombre: "Mundo"
    };
    respuesta.json(mascota);
});


app.listen(puerto, err => {
    if (err) {

        console.error("Error escuchando: ", err);
        return;
    }

    console.log(`Escuchando en el puerto :${puerto}`);
});