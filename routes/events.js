/* 
Rutas de eventos/ events
host +  api/events 
*/

const { Router } = require('express');
const router = Router();

const eventController = require('../controllers/events');

const validateToken = require('../middlewares/token-validator');

const { check } = require('express-validator');

const fieldsValidate = require('../middlewares/fields-validator');

const isDate = require('../helpers/isDate');
//Así se le pasa un middleware a todas las rutas del archivo;
router.use(validateToken);

router.get('/', eventController.getEvent);

router.post(
  '/',
  [
    check('title')
      .isLength({ min: 1 })
      .withMessage('Title must have at least 1 character'),
    check('start').custom(isDate).withMessage('Start date is required'),
    check('end').custom(isDate).withMessage('End date is required'),
    fieldsValidate,
  ],
  eventController.createEvent
);

router.put('/:id', eventController.updateEvent);

router.delete('/:id', eventController.deleteEvent);

module.exports = router;
