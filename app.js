const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const getRoutes = require('./routes/get.js')
const postRoutes = require('./routes/post.js');

const app = express();

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionOption = {
    secret: "superSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    res.locals.redirectUrl = req.originalUrl || "";
    next();
});

mongoose.connect("mongodb://127.0.0.1:27017/Spotify")
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.error("MongoDB connection error:", e));

app.get('/', (req, res) => {
    res.redirect('/api');
});


app.use('/api', getRoutes);
app.use('/api', postRoutes);


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({ success: false, error: { message } });
});

app.listen(8080, () => {
    console.log("Spotify server running on port 8080");
});