//mongoose es un paquete para generar modelos y así usarlos en mi db
const mongoose = require('mongoose');

//Esto se realiza según la documentacion https://mongoosejs.com/
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('DB Online');
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnection;
