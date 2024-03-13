const usersCtrl = {};

const passport = require('passport');
const User = require('../models/User');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    console.log(req.body)
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 7) {
        errors.push({text: 'La contraseña tiene que tener al menos 8 caracteres!'})
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        })
    } else {
        //res.send('logeo exitoso!')
        // const emailUser = await User.findOne({email: email});
        // if (emailUser) {
        //     req.flash('error_msg', 'The email is already in use.');
        //     res.redirect('/users/signup');
        // } else {
        //     const newUser = new User({name, email, password});
        //     newUser.password = await newUser.encryptPassword(password)
        //     await newUser.save();
        //     req.flash('success_msg', 'You are registered')
        //     res.redirect('/users/signin');
        // }
        res.redirect('/');
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
})

usersCtrl.logout = (req, res) => {
    // req.logout((err) => {
    //     if(err){return next(err);}
    // });
    // req.flash('success_msg', 'you are logged out now.');
    res.redirect('/users/signin');
};

//Cerrar sesión
// usersCtrl.logout = (req, res) => {
    
//     req.logout( (err) => {

//         if (err) { return next(err); }
//         req.flash( "success_msg" , "Session cerrada" );
//         res.redirect( "/users/signin" );

//     });
// }

module.exports = usersCtrl;