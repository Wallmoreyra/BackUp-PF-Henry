const mongoose = require('mongoose')

//const { MONGODB_HOST, MONGODB_DATABASE} = process.env;


//const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;
//const MONGODB_URI = 'mongodb://127.0.0.1/the-closet-app';

// Utiliza las variables de entorno para el nombre de usuario y la contraseña
const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } = process.env;

// Construye la cadena de conexión con las variables de entorno
const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(MONGODB_URI)
    .then(db => console.log('La base de datos esta conectada!!'))
    .catch(err => console.log(err));
