const request = require("request");

const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2d9615584d29782661764e1ba936b7dc&query=${lat},${lng}`;
    request({ url, json: true }, (errror, { body }) => {
        if(errror) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const curr = body.current;
            console.log(body);
            callback(undefined, `${curr.weather_descriptions[0]}. It is currently ${curr.temperature} degress out. It feels like ${curr.feelslike} degress out. Wind speed is ${curr.wind_speed} km/h. The humidity is ${curr.humidity}%.`);
        }
    });
}

module.exports = forecast;