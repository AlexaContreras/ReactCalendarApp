const { model, Schema } = require('mongoose');

// https://mongoosejs.com/
// se genera un schema para poder generar los usuarios con las propiedades y valores que se requieren
const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// exporto el modelo mandando el nombre model(nombre, schema)
//Mongo en la db se encarga de poner el nombre de la coleccion en plural en este caso users

module.exports = model('User', UserSchema);
