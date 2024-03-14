const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    // Match Email's user
    const user = await Usuarios.findOne({email})
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado!!'});
    } else {
        // Math Password's User
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }else {
            return done(null, false, {message: 'Contraseña incorrecta!'})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    Usuarios.findById(id, (err, user) => {
        done(err, user);
    })
});


// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await Usuarios.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error, null)
//     }
    
// });