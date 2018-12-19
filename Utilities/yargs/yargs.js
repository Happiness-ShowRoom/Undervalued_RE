const yargs = require('yargs');

module.exports.argv = () => {
    return yargs
        .options({
            c: {
                demand: true,
                alias: 'city',
                describe: 'city and state for serching',
                string: true
            },
            t: {
                demand: false,
                alias: 'propertyType',
                describe: 'Property Type for serching',
                string: true
            },
            p: {
                demand: false,
                alias: 'minPrice',
                describe: 'Minimum Price for serching',
                number: true
            },
            P: {
                demand: false,
                alias: 'maxPrice',
                describe: 'Maximum Price for serching',
                number: true
            },
            b: {
                demand: false,
                alias: 'minBeds',
                describe: 'Minimum Beds for serching',
                number: true
            },
            B: {
                demand: false,
                alias: 'maxBeds',
                describe: 'Maximum Beds for serching',
                number: true
            },
            d: {    
                demand: false,
                alias: 'maxDaysOnMarket',
                describe: 'Max Days On Market for serching',
                number: true
            }, 
            g: {    
                demand: false,
                alias: 'hasGarage',
                describe: 'Has-Garage for serching',
                string: true
            }, 
            g: {    
                demand: false,
                alias: 'hasGarage',
                describe: 'Has-Garage for serching',
                string: true
            }, 
            s : {
                demand: false,
                alias: 'status',
                describe: 'Status of Listing for serching',
                string: true
            }

        })
        .help()
        .alias('help', 'h')
        .argv;
}