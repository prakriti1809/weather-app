const request = require('request');

function fetchWeather({ latitude, longitude }, callback) {
    const url = `https://api.darksky.net/forecast/056a1d1c57195094918fb706093c20c8/${latitude},${longitude}`;

    request({
        url,
        json: true,
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to the server.');
        } else if(response.statusCode !== 200) {
            callback('Could not find the weather for the given location!');
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
            });
        }
    });

}

module.exports = {
    fetchWeather,
};
