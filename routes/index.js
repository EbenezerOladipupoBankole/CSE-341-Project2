const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/artworks', require('./artworks'));
router.use('/museums', require('./museums'));

module.exports = router;
