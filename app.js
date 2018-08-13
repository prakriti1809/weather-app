const yargs = require('yargs');
const location = require('./location');
const weather = require('./weather');

const argv = yargs
    .options({
        c: {
            demand: true,
            alias: 'city',
            describe: 'City to fetch weather for',
            string: true,
        },
    })
    .help()
    .alias('help', 'h')
    .argv;

location.getLocation(argv.city, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        const { latitude, longitude, address } = results;
        const temperature = weather.fetchWeather({ latitude, longitude }, (errorMessage, weatherResults) => {
            console.log(`It's currently ${weatherResults.temperature} in ${address}. It feels like ${weatherResults.apparentTemperature}.`);
        });
    }
});