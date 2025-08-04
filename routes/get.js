const express = require('express');
const router = express.Router();
const asyncwrap = require('../asyncwrap');
const index = require('../Controllers/pages');

// User is Authenticated or not
router.get('/isAuthenticated', (req, res) => {
    res.json({ valid: req.isAuthenticated() });
});

// first responese
router.get("/", asyncwrap(index.FrontPge));

// User logout
router.get("/logout",index.Logout);

// Check username is already taken 
router.get('/check-username', asyncwrap(index.UserExist));

//Front page music play 
router.get('/music',asyncwrap(index.FrontPageMusic));

// Search a song
router.get('/search', asyncwrap(index.SearchSong));

// Search song is exist
router.get('/search-check', asyncwrap(index.SongExist));

// Back to home page
router.get('/home', asyncwrap(index.HomePge));

module.exports = router;