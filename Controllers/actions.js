const passport = require('passport');
const User = require('../models/user');
const PlayList = require('../models/playList');

module.exports.addSong = async (req, res, next) => {
        const user = await User.findOne({ username: req.user.username });
        const song = await PlayList.create(req.body);
        user.playlist.push(song._id);
        await user.save();
        res.json({song:song});
};

module.exports.signUp = async (req, res, next) => {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Account created");
            res.redirect('/api');
        }); 
};

module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) return next(err);
        if (!user) return res.json({ valid: false });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ valid: true });
        });
    })(req, res, next);
};

module.exports.deleteSong = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(req.user._id, { $pull: { playlist: id } });
    await PlayList.findByIdAndDelete(id);
    res.json({ deleted: true });
};