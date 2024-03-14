require('dotenv').config();
const mongoose = require('mongoose')

const app = require('./src/server');
require('./src/database');

app.listen( app.get('port'), () => {
    console.log('server on port: ', app.get('port'))
});