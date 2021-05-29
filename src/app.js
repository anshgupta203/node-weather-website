const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and view Path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directories to server
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        Name: 'Ansh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        Name: 'Ansh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        Name: 'Ansh'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You need to enter an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
        if(error){
           return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'partly cloudy',
    //     temperature: '30 degrees',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Cannot be found'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found',
        title: 'Error page',
        Name: 'Ansh'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found',
        title: 'Error page',
        Name: 'Ansh'
    })
})



app.listen(port, ()=> {
    console.log('Server is running on' + port)
})