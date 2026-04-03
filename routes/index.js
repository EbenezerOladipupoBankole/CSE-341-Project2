const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/artworks', require('./artworks'));
router.use('/museums', require('./museums'));

router.get('/login', passport.authenticate('github', (req, res) => { }));

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = router;

