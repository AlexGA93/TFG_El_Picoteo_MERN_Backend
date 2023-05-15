import express, { json, urlencoded } from 'express';

const app = express();

app.use(json());
app.use(urlencoded({extended: true}));

// rutas

const PORT = process.env.PORT||5000;

app.listen(PORT,() => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;