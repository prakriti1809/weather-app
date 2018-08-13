const request = require('request');

function getLocation(city, callback) {
    const encodedCity = encodeURIComponent(city);

    request({
        url: `http://apidev.accuweather.com/locations/v1/search?q=${encodedCity}&apikey=hoArfRosT1215`,
        json: true,
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect..');
        } else if (response.statusCode !== 200) {
            callback('Something went wrong...');
        } else {
            if(body && body[0]) {
                const { GeoPosition, EnglishName, Country, Region } = body[0];
                const { Latitude: latitude, Longitude: longitude } = GeoPosition;
                const address = `${EnglishName}, ${Country.EnglishName}, ${Region.EnglishName}`;

                callback(undefined, { latitude, longitude, address });

            } else {
                callback('Unknown city...');
            }
        }
    });
}

module.exports = {
    getLocation,
};