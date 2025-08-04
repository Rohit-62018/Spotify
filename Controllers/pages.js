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

module.exports.FrontPge = async (req, res) => {
    const alltrend = await Trend.find();
    const allArtist = await Artist.find();
    const allCharts = await Chart.find();
    let userData = null;
    if (req.isAuthenticated()) {
        userData = await User.findOne({ username: req.user.username })
        .populate("playlist");
    }
    res.render("indexes/show.ejs",
         { alltrend, allArtist, allCharts, songData: userData });
}

module.exports.Logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logout successfully");
        res.redirect("/api");
    });
};

module.exports.UserExist = async (req, res) => {
    const { username } = req.query;
    const exists = await User.findOne({ username });
    res.json({ available: !exists });
};

module.exports.FrontPageMusic = async(req, res) => {
    const { q, Url } = req.query;
    const songs = await getSong(q);
    res.render('indexes/list.ejs', { songs, Url });
};

module.exports.SearchSong = async(req, res) => {
    const { q } = req.query;
    const songs = await getSong(q);
    const Url = songs[0]?.image?.[2]?.url || "";
    res.render('indexes/list.ejs', { songs, Url });
};

module.exports.SearchSong = async (req, res) => {
    const { q } = req.query;
    const songs = await getSong(q);
    res.json({ available: songs.length > 0 });
};

module.exports.HomePge = async (req, res) => {
    const alltrend = await Trend.find();
    const allArtist = await Artist.find();
    const allCharts = await Chart.find();
    res.render('indexes/songContent.ejs', { alltrend, allArtist, allCharts });
};