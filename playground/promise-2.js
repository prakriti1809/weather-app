const request = require('request');

const geocodeAddress = (city) => {
    const encodedCity = encodeURIComponent(city);
    return new Promise((resolve, reject) => {
        request({
            url: `http://apidev.accuweather.com/locations/v1/search?q=${encodedCity}&apikey=hoArfRosT1215`,
            json: true,
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect..');
            } else if (response.statusCode !== 200) {
                reject('Something went wrong...');
            } else {
                if(body && body[0]) {
                    const { GeoPosition, EnglishName, Country, Region } = body[0];
                    const { Latitude: latitude, Longitude: longitude } = GeoPosition;
                    const address = `${EnglishName}, ${Country.EnglishName}, ${Region.EnglishName}`;

                    resolve({ latitude, longitude, address });

                } else {
                    reject('Unknown city...');
                }
            }
        });

    });
};

geocodeAddress('Hyderabad').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (error) => {
    console.log(error);
});