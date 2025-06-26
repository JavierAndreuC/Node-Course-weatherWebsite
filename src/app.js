const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Javier Andreu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Javier Andreu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'If you need any help contact us.',
        name: 'Javier Andreu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    forecast(req.query.address, 'm', (error, data) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: data.weatherDesc,
            temperature: data.temperature,  
            feelslike: data.feelslike,
            address: req.query.address
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        errorMessage: 'Help article not found.',
        name: 'Javier Andreu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        errorMessage: 'Page not found.',
        name: 'Javier Andreu'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})