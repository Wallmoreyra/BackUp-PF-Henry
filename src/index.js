// require('dotenv').config();
// const mongoose = require('mongoose')

// const app = require('./server');
// require('./database');

// app.listen( app.get('port'), () => {
//     console.log('server on port: ', app.get('port'))
// });


require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 9000;
const app = require('./server')


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a mi base de datos en MongoDB"))
  .catch((error) => console.log(error));

app.listen(port, () => console.log(`Server listening on port ${port}`));