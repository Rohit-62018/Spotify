const express = require('express');
const router = express.Router();
const asyncwrap = require('../asyncwrap');
const { Trend, Artist, Chart } = require('../models/songModle');
const User = require('../models/user');



const axios = require('axios');
async function getSong(songName) {
    try {
        const url = `https://saavn.dev/api/search/songs?query=${encodeURIComponent(songName)}`;
        const res = await axios.get(url);
        return res.data.data.results || [];
    } catch (err) {
        console.log('Axios Error:', err.message);
        return [];
    }
}

router.get("/", asyncwrap(async (req, res) => {
    const alltrend = await Trend.find();
    const allArtist = await Artist.find();
    const allCharts = await Chart.find();
    let userData = null;

    if (req.isAuthenticated()) {
        userData = await User.findOne({ username: req.user.username }).populate("playlist");
    }

    res.render("indexes/show.ejs", { alltrend, allArtist, allCharts, songData: userData });
}));

router.get("/logout",(req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logout successfully");
        res.redirect("/api");
    });
});

router.get('/check-username', asyncwrap(async (req, res) => {
    const { username } = req.query;
    const exists = await User.findOne({ username });
    res.json({ available: !exists });
}));

router.get('/music',asyncwrap(async(req, res) => {
    const { q, Url } = req.query;
    const songs = await getSong(q);
    res.render('indexes/list.ejs', { songs, Url });
}));

router.get('/search', asyncwrap(async(req, res) => {
    const { q } = req.query;
    const songs = await getSong(q);
    const Url = songs[0]?.image?.[2]?.url || "";
    res.render('indexes/list.ejs', { songs, Url });
}));

router.get('/search-check', asyncwrap(async (req, res) => {
    const { q } = req.query;
    const songs = await getSong(q);
    res.json({ available: songs.length > 0 });
}));

router.get('/isAuthenticated', (req, res) => {
    res.json({ valid: req.isAuthenticated() });
});

router.get('/home', asyncwrap(async (req, res) => {
    const alltrend = await Trend.find();
    const allArtist = await Artist.find();
    const allCharts = await Chart.find();
    res.render('indexes/songContent.ejs', { alltrend, allArtist, allCharts });
}));

module.exports = router;