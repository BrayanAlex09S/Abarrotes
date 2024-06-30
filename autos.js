const mongoose = require('mongoose');

const autoSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true },
    color: { type: String, required: true },
    precio: { type: Number, required: true },
    estado: { type: String, required: true }, // Nuevo o Usado
    fechaIngreso: { type: Date, default: Date.now }
});

const Auto = mongoose.model('Auto', autoSchema);

module.exports = Auto;

const mongoose = require('mongoose');
const Auto = require('./models/Auto');

mongoose.connect('mongodb://localhost:27017/autos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB');
        
        const auto1 = new Auto({
            marca: 'Toyota',
            modelo: 'Corolla',
            anio: 2020,
            color: 'Blanco',
            precio: 300000,
            estado: 'Nuevo'
        });

        const auto2 = new Auto({
            marca: 'Honda',
            modelo: 'Civic',
            anio: 2018,
            color: 'Negro',
            precio: 250000,
            estado: 'Usado'
        });

        return Auto.insertMany([auto1, auto2]);
    })
    .then(() => {
        console.log('Datos insertados');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });
