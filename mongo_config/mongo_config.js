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

// Agregar contratos de renta de carro
const agregarContrato = (req, res)=> {

  const contrato = new Contrato({
        cedula: Number(req.body.cedula),
        placa: req.body.placa,
        cantidad_Dias: Number(req.body.cantidad_Dias),
        precio_Total: Number(req.body.precio) 
  })
  contrato.save()
  .then(() => {
    return Vehiculo.find({ disponibilidad: "Disponible" }); // Busca todos los vehículos disponibles
  })
  .then((vehiculos)=>{
      res.locals.mensaje = 'Renta del vehiculo con exito'
      res.render('index', {vehiculos, mensaje: res.locals.mensaje })
      res.redirect('/index');
    })
  .catch(err => {
      console.error(err);
      res.locals.mensaje = 'No se pudo realizar la renta del vehiculo'
      res.render('index', { mensaje: res.locals.mensaje })
    })
}

// Elimina los Contratos por placa
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

// Muestra todos los vehiculos disponibles
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
  .then(() => {
    return Vehiculo.find(); // Busca todos los vehículos después de agregar uno nuevo
  })
  .then((vehiculos) => {
    res.locals.mensaje = 'El vehiculo se agrego con exito';
    res.render('manteCarros', { vehiculos, mensaje: res.locals.mensaje }); // Pasa el arreglo de vehículos a la vista
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

// Modificar un vehículo por placa
const modificarVehiculo = async (req, res) => {
  try {
    const placa = req.body.placa;
    const nuevosDatos = {
      marca: req.body.marca,
      tipo: req.body.tipo,
      disponibilidad: req.body.disponibilidad,
      precio_Renta: Number(req.body.precio_Renta)
    };
    const resultado = await Vehiculo.findOneAndUpdate(
      { placa },
      nuevosDatos,
      { new: true }
    );
    // Busca todos los vehículos después de modificar uno
    const vehiculos = await  Vehiculo.find();
    res.locals.mensaje = 'El vehiculo se modificó con éxito';
    res.render('modificar', {vehiculos ,mensaje: res.locals.mensaje });
    res.redirect('/modificar');
  } catch (error) {
    console.log(error);
    res.locals.mensaje = 'No se pudo modificar el vehiculo';
    res.render('modificar', { mensaje: res.locals.mensaje });
  }
};

// Eliminar un vehículo por placa
const eliminarVehiculoPorPlaca = (req, res) => {
    const placa = req.body.placa
    Vehiculo.findOneAndDelete({ placa: placa })
      .then(() => {
        res.locals.mensaje = 'El vehiculo se elimino con exito'
        res.render('modificar', { mensaje: res.locals.mensaje })
        res.redirect('/modificar');
      })
      .catch(err => {
        console.error(err);
        res.locals.mensaje = 'No se pudo eliminar el vehiculo'
        res.render('modificar', { mensaje: res.locals.mensaje })
        res.redirect('/modificar');
      })
};

export {Vehiculo,eliminarVehiculoPorPlaca, agregarContrato, eliminarContrato, todosLosVehiculos, agregarVehiculo, 
consultarVehiculos, modificarVehiculo}
