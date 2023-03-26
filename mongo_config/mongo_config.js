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
    })
  .catch(err => {
      console.error(err);
      res.locals.mensaje = 'No se pudo realizar la renta del vehiculo'
      res.render('index', { mensaje: res.locals.mensaje })
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

const todosLosVehiculos = async(modelo) => {
  const resultados = await modelo.find({ disponibilidad: "Disponible" })
  return resultados
}

// Agregar un nuevo vehículo
const agregarVehiculo = (req, res) => {
  const vehiculo = new Vehiculo({
    placa: req.body.placa,
    marca: req.body.marca,
    tipo: req.body.tipo,
    disponibilidad: req.body.disponibilidad,
    precio_Renta: Number(req.body.precio_Renta) 
})
vehiculo.save()
.then(re =>{
    res.locals.mensaje = 'El vehiculo se agrego con exito'
    res.render('manteCarros', { mensaje: res.locals.mensaje })

})
.catch(err => {
    console.error(err);
    res.locals.mensaje = 'No se pudo agregar el vehiculo'
    res.render('manteCarros', { mensaje: res.locals.mensaje })
  })
};

// Consultar todos los vehículos
const consultarVehiculos = async (modeloVehiculo) => {
  const resultados = await modeloVehiculo.find({});
  return resultados;
};

// Buscar un vehículo por placa
const buscarVehiculoPorPlaca = async (placa) => {
  const resultado = await Vehiculo.findById(placa);
  return resultado;
};

// Modificar un vehículo por placa
const modificarVehiculo = async (id, datosVehiculo) => {
  const resultado = await Vehiculo.findByIdAndUpdate(id, datosVehiculo, { new: true });
  return resultado;
};

// Eliminar un vehículo por placa
const eliminarVehiculo = async (id) => {
  const resultado = await Vehiculo.findByIdAndDelete(id);
  return resultado;
};


export {Vehiculo, agregarContrato, eliminarContrato, todosLosVehiculos, agregarVehiculo, 
consultarVehiculos, buscarVehiculoPorPlaca,modificarVehiculo, eliminarVehiculo}
