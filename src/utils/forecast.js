const request = require("postman-request")



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4361ac1ab000623e5f8b723c4768bbc1&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect. Try again!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. The temperature is ' + body.current.temperature + ' degrees out but it feels like ' + body.current.feelslike + ' degrees.' + ' Humidity ' + body.current.humidity)
        }
    })
}


module.exports = forecast