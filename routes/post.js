const express = require('express');
const router = express.Router();
const asyncwrap = require('../asyncwrap');
const index = require('../Controllers/actions')
// Add new song in Playlist
router.post('/addSong', asyncwrap(index.addSong));

// Create a new account
router.post("/signup", asyncwrap(index.signUp));

// Login user
router.post('/login',index.login);

// Delete playlist song
router.delete('/delete/:id',index.deleteSong);

module.exports = router;