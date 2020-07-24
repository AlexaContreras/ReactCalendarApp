/* 
Rutas de usuarios / Auth
host +  api/auth 
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const fieldsValidate = require('../middlewares/fields-validator');
/* Esto pasa como middleware de validacion sin necesidad de estar en el controller */

const validateToken = require('../middlewares/token-validator');
const authController = require('../controllers/auth');

// router.get('/token');

router.post(
  '/register',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Name must have at least 1 character'),
    check('email')
      .isEmail()
      .withMessage(
        'You have entered an invalid e-mail address. Please try again'
      ),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must include at least 6 characters'),
    fieldsValidate,
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage(
        'You have entered an invalid e-mail address. Please try again'
      ),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must include at least 6 characters'),
    fieldsValidate,
  ],
  authController.login
);

router.get('/renew', validateToken, authController.token);

module.exports = router;
