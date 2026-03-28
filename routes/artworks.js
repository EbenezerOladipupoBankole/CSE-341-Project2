const express = require('express');
const router = express.Router();
const artworksController = require('../controllers/artworks');
const { artworkValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', artworksController.getAll);
router.get('/:id', artworksController.getSingle);
router.post('/', isAuthenticated, artworkValidationRules(), validate, artworksController.createArtwork);
router.put('/:id', isAuthenticated, artworkValidationRules(), validate, artworksController.updateArtwork);
router.delete('/:id', isAuthenticated, artworksController.deleteArtwork);


module.exports = router;
