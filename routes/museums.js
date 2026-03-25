const express = require('express');
const router = express.Router();
const museumsController = require('../controllers/museums');
const { museumValidationRules, validate } = require('../middleware/validate');

router.get('/', museumsController.getAll);
router.get('/:id', museumsController.getSingle);
router.post('/', museumValidationRules(), validate, museumsController.createMuseum);
router.put('/:id', museumValidationRules(), validate, museumsController.updateMuseum);
router.delete('/:id', museumsController.deleteMuseum);

module.exports = router;
