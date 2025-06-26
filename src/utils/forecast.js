const request = require('postman-request')

const forecast = (location, units, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b227c459136113f35b67cc817e3a01b4&query=${encodeURIComponent(location)}&units=${units}`

    request({url: url, json: true}, (error, { body} ) => {
        if (error) {
            callback('Unable to get connect to forecast service.')
        } else if (!body.current) {
            callback('Error while getting data from forecast service.')
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weatherDesc: body.current.weather_descriptions[0],
            })
        }
    })
}

module.exports = forecast