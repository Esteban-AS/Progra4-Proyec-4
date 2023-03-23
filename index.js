import express from 'express'
import {agregarContrato, eliminarContrato} from './mongo_config/mongo_config.js'

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

app.get('/', (req, res)=> {
    res.render('index')
})

app.post('/rentar', (req, res)=>{
    agregarContrato(req, res)
})

app.post('/devolucion', (req, res)=>{
    eliminarContrato(req, res)
})
