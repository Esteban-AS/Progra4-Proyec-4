import express from 'express'
import {Vehiculo, agregarContrato, eliminarContrato, todosLosVehiculos, agregarVehiculo, 
    consultarVehiculos, buscarVehiculoPorId,modificarVehiculo, eliminarVehiculo} from './mongo_config/mongo_config.js'

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
    res.render('index', {vehiculos})
})

app.post('/rentar', (req, res)=>{
    agregarContrato(req, res)
})

app.post('/devolucion', (req, res)=>{
    eliminarContrato(req, res)
})

app.get('/manteCarros', (req, res)=>{
    res.render('manteCarros')
})

app.post('/agregar', (req, res)=>{
    agregarVehiculo(req, res)
})