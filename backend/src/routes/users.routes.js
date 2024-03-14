const { Router } = require('express');
const router = Router();


const multer = require('multer');
//--------------------------------------------

// Configurar multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

const { renderSignUpForm, renderSigninForm, signup, signin, logout, renderUsers, borrarUser, getActualizar, putActualizar } = require('../controllers/users.controller');

// Todos los Usuarios
router.get('/users', renderUsers)

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup);

router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);


// Cambiar El Usuario a admin o verificado
router.get('/users/actualizar/:id', getActualizar)
router.put('/users/actualizar/:id', putActualizar)

// Borrar Producto
router.delete('/users/delete/:id', borrarUser);


module.exports = router;