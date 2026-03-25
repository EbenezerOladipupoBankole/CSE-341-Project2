const { body, validationResult } = require('express-validator')

const artworkValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required'),
    body('artist').notEmpty().withMessage('Artist is required'),
    body('medium').notEmpty().withMessage('Medium is required'),
    body('year').isInt().withMessage('Year must be an integer'),
    body('dimensions').notEmpty().withMessage('Dimensions are required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('availability').isBoolean().withMessage('Availability must be a boolean'),
    body('imageUrl').isURL().withMessage('Image URL must be a valid URL'),
    body('museumId').notEmpty().withMessage('Museum ID is required'),
  ]
}

const museumValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('founded').isInt().withMessage('Founded year must be an integer'),
    body('director').notEmpty().withMessage('Director is required'),
    body('website').isURL().withMessage('Website must be a valid URL'),
    body('collectionSize').isInt().withMessage('Collection size must be an integer'),
    body('bio').notEmpty().withMessage('Bio is required'),
    body('admissionFee').isNumeric().withMessage('Admission fee must be a number'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = {
  artworkValidationRules,
  museumValidationRules,
  validate,
}
