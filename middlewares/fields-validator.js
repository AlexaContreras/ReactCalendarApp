//const response es solo para ayuda al escribir
const { response } = require('express');

//Este middleware se usa en el router despues de los check y se fija si hay algun error y lo genera
const { validationResult } = require('express-validator');

const fieldsValidate = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = fieldsValidate;
