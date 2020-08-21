const express = require('express');
const authController = require('../controllers/authController');
const authValidation = require('../middleware/authValidation');

const router = express.Router();

router
  .route('/register')
  .post(
    authValidation.validateReq,
    authValidation.validateUniqueUsername, 
    authController.register
  );

router
  .route('/login')
  .post(
    authValidation.validateReq, 
    authController.login
  );

module.exports = router;