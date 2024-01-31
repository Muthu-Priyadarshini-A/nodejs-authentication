const express = require("express");
const expresslayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const app = express();
const PORT = 5000;

const passport = require('passport');
const LocalStrategy = require('./config/passport_local_strategy');
const googleStrategy = require('./config/passport-google-oauth2-strategy');

const session = require('express-session');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware')




// ...........EJS .................
app.use(expresslayouts);
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.set("layout extractStyles", true);
app.set('layout extractScript', true);

// middelware
app.use(express.urlencoded());

// sessions
app.use(session({
    name: "habit_tracker",
    secret: 'balasomthing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));


// use passport 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setflash);



app.use('/', require('./routes'));



app.listen(PORT, () => {
    console.log('The app is running in port', PORT);
})