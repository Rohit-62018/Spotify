const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const PlayList = require('../models/playList');

router.post('/addSong', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        const song = await PlayList.create(req.body);
        user.playlist.push(song._id);
        await user.save();
        res.json({ added: true });
    } catch (err) {
        next(err);
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Account created");
            res.redirect('/api');
        });
    } catch (err) {
        next(err);
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) return next(err);
        if (!user) return res.json({ valid: false });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ valid: true });
        });
    })(req, res, next);
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(req.user._id, { $pull: { playlist: id } });
    await PlayList.findByIdAndDelete(id);
    res.json({ deleted: true });
});

module.exports = router;