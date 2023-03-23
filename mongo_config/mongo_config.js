import mongoose from 'mongoose'

const {Schema} =  mongoose

const url_conexion = 'mongodb+srv://arayaesteban25:123MongoDB@cluster0.zjteqia.mongodb.net/bd_AppRentas?retryWrites=true&w=majority'
mongoose.connect(url_conexion, {useNewUrlParser: true, useUnifiedTopology: true});

// esquema para la coleccion
const vehiculoSchema = new Schema({
    placa: String,
    marca: String,
    tipo: String,
    disponibilidad: String,
    precio_Renta: Number
})

const contratoSchema = new Schema({
    cedula: Number,
    placa: String,
    cantidad_Dias: Number,
    precio_Total: Number
})

// modelo con el que se trabaja
const Vehiculo = mongoose.model('Vehiculos', vehiculoSchema)

const Contrato = mongoose.model('Contratos', contratoSchema)

// Funciones

const agregarContrato = (req, res)=> {
    
    const contrato = new Contrato({
        cedula: Number(req.body.cedula),
        placa: req.body.placa,
        cantidad_Dias: Number(req.body.cantidad_Dias),
        precio_Total: Number(req.body.precio) 
    })
    contrato.save()
    .then(re =>{
        res.locals.mensaje = 'Renta del vehiculo con exito'
        res.render('index', { mensaje: res.locals.mensaje })
        res.redirect('/')
    })
    .catch(err => {
        console.error(err);
        res.locals.mensaje = 'No se pudo realizar la renta del vehiculo'
        res.render('index', { mensaje: res.locals.mensaje })
        res.redirect('/');
      })
}

const eliminarContrato = (req, res) => {
    const placa = req.body.placa
    Contrato.findOneAndDelete({ placa: placa })
      .then(() => {
        res.locals.mensaje = 'La devolución se realizo con exito'
        res.render('index', { mensaje: res.locals.mensaje })
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
        res.locals.mensaje = 'No se pudo realizar la devolución'
        res.render('index', { mensaje: res.locals.mensaje })
        res.redirect('/');
      })
}
  
export {agregarContrato, eliminarContrato}