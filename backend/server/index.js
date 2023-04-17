const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// rutas

const PORT = process.env.PORT||5000;

app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;