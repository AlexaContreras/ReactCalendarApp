//const response es solo para ayuda al escribir
const { response } = require('express');

const bcrypt = require('bcryptjs');

// User es el modelo que uso como base para generar los usuarios en la db
const User = require('../models/UserModel');
const generateJWT = require('../helpers/jwt');

const authController = {
  register: async (req, res = response) => {
    const { email, password } = req.body;

    try {
      //Primero pido de la db si existe el user
      let user = await User.findOne({ email });

      //si esxiste
      if (user) {
        // retorno un error
        return res.status(400).json({
          ok: false,
          msg:
            'E-mail address already register, please try again with another e-mail',
        });
      }

      //si no, lo genero
      user = new User(req.body);

      // encripto la contraseña
      user.password = bcrypt.hashSync(password, 10);

      // se guarda en Mongo
      await user.save();

      //generar JWT JsonWebToken
      const token = await generateJWT(user.id, user.name);

      res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
        token,
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        msg: 'Database error',
      });
    }
  },

  login: async (req, res = response) => {
    const { email, password } = req.body;

    try {
      //Primero pido de la db si existe el user
      let user = await User.findOne({ email });

      //si no existe
      if (!user) {
        // retorno un error
        return res.status(400).json({
          ok: false,
          msg:
            'E-mail not found, please try again with another account or sign up',
        });
      }

      //confirmar password
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: 'Invalid password',
        });
      }

      // Generar token
      const token = await generateJWT(user.id, user.name);

      res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
        token,
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        msg: 'Database error',
      });
    }
  },

  token: async (req, res) => {
    const { uid, name } = req;

    const token = await generateJWT(uid, name);

    res.json({
      ok: true,
      token,
      uid,
      name,
    });
  },
};

module.exports = authController;
