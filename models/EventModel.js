const { model, Schema } = require('mongoose');

// https://mongoosejs.com/
// se genera un schema para poder generar los usuarios con las propiedades y valores que se requieren
const EventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

EventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

//Mongo en la db se encarga de poner el nombre de la coleccion en plural en este caso users

// exporto el modelo mandando el nombre model(nombre, schema)
module.exports = model('Event', EventSchema);
