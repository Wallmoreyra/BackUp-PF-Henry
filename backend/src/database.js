const mongoose = require('mongoose')

const { MONGODB_HOST, MONGODB_DATABASE} = process.env;


const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;
//const MONGODB_URI = 'mongodb://127.0.0.1/the-closet-app';

mongoose.connect(MONGODB_URI)
    .then(db => console.log('La base de datos esta conectada!!'))
    .catch(err => console.log(err));