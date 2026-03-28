const express = require('express');
const router = express.Router();
const museumsController = require('../controllers/museums');
const { museumValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', museumsController.getAll);
router.get('/:id', museumsController.getSingle);
router.post('/', isAuthenticated, museumValidationRules(), validate, museumsController.createMuseum);
router.put('/:id', isAuthenticated, museumValidationRules(), validate, museumsController.updateMuseum);
router.delete('/:id', isAuthenticated, museumsController.deleteMuseum);

module.exports = router;
