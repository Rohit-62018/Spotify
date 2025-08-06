require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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

const Url = process.env.CLOUD_DB;
mongoose.connect(Url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.error("MongoDB connection error:", e));

const storage =  MongoStore.create({
    mongoUrl: Url,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
 })

 storage.on('error',(err)=>{
    console.log('Error in MOngosh session',err.message);
 })
 
const sessionOption = {
    store: storage,
    secret:process.env.SECRET ,
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


app.get('/', (req, res) => {
    res.redirect('/api');
});


app.use('/api', getRoutes);
app.use('/api', postRoutes);


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    req.flash('error',`${message}`)
    res.status(status).redirect('/api');
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});