const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    descripcion: { type: String, required: false },
    proveedor: { type: String, required: true },
    fechaIngreso: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;

const mongoose = require('mongoose');
const Producto = require('./models/Producto');

mongoose.connect('mongodb://localhost:27017/tienda', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB');
        
        const producto1 = new Producto({
            nombre: 'Arroz',
            categoria: 'Granos',
            precio: 20,
            stock: 100,
            descripcion: 'Arroz blanco de calidad',
            proveedor: 'Proveedor A'
        });

        const producto2 = new Producto({
            nombre: 'Aceite',
            categoria: 'Aceites',
            precio: 50,
            stock: 50,
            descripcion: 'Aceite vegetal',
            proveedor: 'Proveedor B'
        });

        return Producto.insertMany([producto1, producto2]);
    })
    .then(() => {
        console.log('Datos insertados');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });
