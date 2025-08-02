const express  = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const axios = require('axios');
const wrapasync = require('./asyncwrap.js');

const { Trend, Artist, Chart} = require('./models/songModle.js');
const PlayList  = require('./models/playList.js');
const asyncwrap = require('./asyncwrap.js');
const session = require('express-session');
const flash = require('express-flash'); 
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const app = express();

app.engine('ejs', ejsMate); 
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const sessionOption = {
    secret:"suppreSecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    res.locals.redirectUrl = req.originalUrl || "";
    next();
})


async function main() {
   await mongoose.connect("mongodb://127.0.0.1:27017/Spotify")
}

main()
  .then(()=>console.log("connected mongoose"))
  .catch((e)=>console.log(e))

async function getSong(songName) {
    try {
        const url = `https://saavn.dev/api/search/songs?query=${encodeURIComponent(songName)}`;
        const res = await axios.get(url);
        
        const song = res.data.data.results;
        if(!song || song.length===0){
            console.warn(`Result not Found for : ${songName}`);
            return [];
        }
        return song;

    } catch (err) {
        console.log('Axius Error ',err.message);
        return [];
    }
}
app.get('/',(req,res)=>{
    res.redirect('/api');
})

app.get('/api/isAuthenticated',(req,res,next)=>{
    if(!req.isAuthenticated()){
       return res.json({valid:false});
    }
    res.json({valid:true});
})

app.get("/api",asyncwrap(async(req,res)=>{
   let alltrend = await Trend.find();
   let allArtist = await Artist.find(); 
   let allCharts = await Chart.find();
   let userData
   if(req.isAuthenticated()){
     userData = await User.findOne({ username: req.user.username }).populate("playlist");
        return res.render("indexes/show.ejs", {
        alltrend,
        allArtist,
        allCharts,
        songData: userData
        });

    }
   res.render("indexes/show.ejs",{alltrend,allArtist,allCharts,songData: userData});
}))

app.get('/api/home',async(req,res)=>{
    let alltrend = await Trend.find();
   let allArtist = await Artist.find(); 
   let allCharts = await Chart.find();
    res.render('indexes/songContent.ejs',{alltrend,allArtist,allCharts})
})

app.get('/api/music',async(req,res,next)=>{
    let {q,Url} = req.query;
    let songs = await getSong(q);
    res.render('indexes/list.ejs',{songs,Url});
})

app.get('/api/search',async(req,res)=>{
    let {q} = req.query;
    let songs = await getSong(q);
    res.render('indexes/list.ejs',{songs,Url:songs[0].image[2].url});
})

app.get('/api/search-check',async(req,res)=>{
    let {q} = req.query;
    let songs = await getSong(q);
    if(songs.length===0){
        res.json({available:false});
    }else{
        res.json({available:true});
    }
})

app.get('/api/check-username',async(req,res)=>{
    let {username} = req.query;
    let exists = await User.findOne({username:username})
    res.json({ available: !exists });
})

app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.json({ valid: false });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ valid: true });
        });
    })(req, res, next);
});

app.get("/api/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logout successfully");
        res.redirect("/api");
    })
})

app.post('/api/addSong',async(req,res,next)=>{
    const useR = await User.findOne({username:req.user.username});
    const song = await PlayList.create(req.body)
    useR.playlist.push(song._id);
    await useR.save()
        .then(()=>{
            res.json({added:true});
        })
        .catch(next)
})
app.delete('/api/delete/:id',async(req,res)=>{
    let { id } = req.params;
    await User.findByIdAndUpdate(req.user._id,{$pull:{playlist:id}});
    let x =  await PlayList.findByIdAndDelete(id);
    res.json('working');
})

app.post("/api/signup",async(req,res)=>{

    let {username,email, password} = req.body;
    let newuser = new User({email,username})
    const registerUser = await User.register(newuser,password);
    req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","account created");
        res.redirect('/api'); 
    })   
})

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    res.status(status).json({success:false,error:{
        message,
    }})
})

app.listen(8080,()=>{
    console.log("spotify is on");
})