const usersCtrl = {};

const passport = require('passport');
const Usuarios = require('../models/Usuarios');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    console.log(req.body)
    const errors = [];
    const {name, email, password, confirm_password} = req.body;

    // Validar que el email tenga un formato válido
    if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push({ text: 'Por favor, ingresa un correo electrónico válido.' });
    }

    // Validar que el nombre no contenga caracteres especiales ni números
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        errors.push({ text: 'El nombre no puede contener caracteres especiales ni números.' });
    }

    // Validar la fortaleza de la contraseña
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 8 || password.length > 15) {
        errors.push({ text: 'La contraseña tiene que tener entre 8 y 15 caracteres' });
    }
    if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(password)) {
        errors.push({ text: 'La contraseña debe contener al menos un número, una letra y un carácter especial' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    } else {
        //res.send('logeo exitoso!')
        const emailUser = await Usuarios.findOne({email: email});
        console.log(emailUser)
         if (emailUser) {
             req.flash('error_msg', 'El email ya esta registrado.');
             res.redirect('/users/signup');
         } else {
             const newUser = new Usuarios({name, email, password});
             newUser.password = await newUser.encryptPassword(password)
             await newUser.save();
             req.flash('success_msg', 'Usuario Registrado!!!')
             res.redirect('/users/signin');
         }
        //res.redirect('/');
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/',
    failureFlash: true
});



//Cerrar sesión
usersCtrl.logout = (req, res) => {
    
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "success_msg" , "Session cerrada" );
        res.redirect( "/users/signin" );

    });
}


// REND TODOS LOS PRODUCTOS
usersCtrl.renderUsers = async (req, res) => {
    const users = await Usuarios.find().lean();
    res.render('users/all-users', {users})
};



// BORRAR PRODUCTO
usersCtrl.borrarUser = async (req, res) => {
    try {
        await Usuarios.findByIdAndDelete(req.params.id);

        req.flash('success_msg', 'Usuario borrado!')
        res.redirect('/users');
    } catch (error) {
        console.error('Error al borrar el Usuario:', error);
        res.status(500).send('Error al borrar el Usuario');
    }
};

usersCtrl.getActualizar = async (req, res) => {
    try {
        const usuario = await Usuarios.findById(req.params.id).lean();
        if(!usuario) {
            throw new Error('usuario no encontrado');
        }
        req.flash('success_msg', 'Usuario encontrado!')
        res.status(200).json({usuario});

    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).send('No se encontro el usuario');
    }
};

usersCtrl.putActualizar = async (req, res) => {
    try {

        const { id, auxActi, variable } = req.body;
        console.log(req.body);
        
        if(variable === 'admid'){
            await Usuarios.findByIdAndUpdate(id, {admid: auxActi});

        } else {
            await Usuarios.findByIdAndUpdate(id, {emailVerified: auxActi});
        }
        //await Usuarios.findByIdAndDelete(req.params.id);

        res.status(200).send('Estado de Usuario actualizado correctamente');

        //req.flash('success_msg', 'Usuario actualizado!')
        //res.redirect('/users');
    } catch (error) {
        console.error('Error al actualizar el Usuario:', error);
        res.status(500).send('No se actualizo el usuario');
    }
};


module.exports = usersCtrl;