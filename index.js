import express from 'express'
import {Vehiculo, Contrato, consultarContratos, agregarContrato, eliminarContrato, todosLosVehiculos, agregarVehiculo, 
    consultarVehiculos, modificarVehiculo, eliminarVehiculoPorPlaca} from './mongo_config/mongo_config.js'

const app = express()

// Config Servidor
app.set('views', './vistas')
app.set('view engine', 'pug')

app.use(express.static('./estilos'))

// Para pasar los datos por post
app.use(express.urlencoded({extended:true}))

app.listen('8000', (req, res)=> {
    console.log('Aplicacion en http://localhost:8000')
})

app.get('/', async(req, res)=> {
    let vehiculos = await todosLosVehiculos(Vehiculo)
    let contratos = await consultarContratos(Contrato)
    res.render('index', {vehiculos: vehiculos, contratos: contratos})
})

app.post('/rentar', (req, res)=>{
    agregarContrato(req, res)
})

app.post('/devolucion', (req, res)=>{
    eliminarContrato(req, res)
})

app.post('/agregar', (req, res)=>{
    agregarVehiculo(req, res)
})

app.get('/manteCarros', async(req, res)=> {
    let vehiculos = await consultarVehiculos(Vehiculo)
    res.render('manteCarros', {vehiculos})
})

app.get('/modificar', async(req, res)=> {
    let vehiculos = await consultarVehiculos(Vehiculo)
    res.render('modificar', {vehiculos})
})

app.post('/modificarCarro', (req, res)=> {
    modificarVehiculo(req, res)
})

app.post('/eliminarCarro', (req, res) => {
    eliminarVehiculoPorPlaca(req, res)
  })
