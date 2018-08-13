const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        c: {
            demand: true,
            alias: 'city',
            describe: 'City to fetch weather for',
            string: true,
            default: 'Noida'
        },
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedCity = encodeURIComponent(argv.city);
const locationUrl = `http://apidev.accuweather.com/locations/v1/search?q=${encodedCity}&apikey=hoArfRosT1215`;

axios.get(locationUrl)
    .then((response) => {
        if(response && response.data && response.data[0]) {
            const { GeoPosition, EnglishName, Country, Region } = response.data[0];
            const { Latitude: latitude, Longitude: longitude } = GeoPosition;
            const address = `${EnglishName}, ${Country.EnglishName}, ${Region.EnglishName}`;
            const weatherUrl = `https://api.darksky.net/forecast/056a1d1c57195094918fb706093c20c8/${latitude},${longitude}`;

            console.log('Address: ', address);
            return axios.get(weatherUrl);
        }
        console.log(response.data);
    }).then((response) => {
        if (response && response.data && response.data) {
            const { currently } = response.data;
            console.log(`It's currently ${currently.temperature}. It feels like ${currently.apparentTemperature}.`);
        }
}).catch(e => console.log(e));