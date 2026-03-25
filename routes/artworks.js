const express = require('express');
const router = express.Router();
const artworksController = require('../controllers/artworks');
const { artworkValidationRules, validate } = require('../middleware/validate');

router.get('/', artworksController.getAll);
router.get('/:id', artworksController.getSingle);
router.post('/', artworkValidationRules(), validate, artworksController.createArtwork);
router.put('/:id', artworkValidationRules(), validate, artworksController.updateArtwork);
router.delete('/:id', artworksController.deleteArtwork);

module.exports = router;
