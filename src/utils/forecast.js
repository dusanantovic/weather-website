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
            callback(undefined, `${curr.weather_descriptions[0]}. It is currently ${curr.temperature} degress out. It feels like ${curr.feelslike} degress out.`);
        }
    });
}

module.exports = forecast;