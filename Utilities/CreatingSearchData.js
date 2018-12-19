const fs = require('fs');
const yarg = require('./yargs/yargs').argv();
let city,
    propertyType,
    minPrice,
    maxPrice,
    minBeds,
    maxBeds,
    maxDaysOnMarket,
    hasGarage,
    status;


module.exports.setSearchData = () => {
    city = yarg.city;

    if (yarg.propertyType === undefined || yarg.propertyType === '') {
        propertyType = 'house+condo+townhouse+multifamily+land';
    } else {
        propertyType = yarg.propertyType;
    }

    if (yarg.minPrice === undefined || yarg.minPrice === '') {
        minPrice = '0';
    } else {
        minPrice = `${yarg.minPrice}K`;
    }

    if (yarg.maxPrice === undefined || yarg.maxPrice === '') {
        maxPrice = '999K';
    } else {
        maxPrice = `${yarg.maxPrice}K`;
    }

    if (yarg.minBeds === undefined || yarg.minBeds === '') {
        minBeds = '1';
    } else {
        minBeds = yarg.minBeds;
    }

    if (yarg.maxBeds === undefined || yarg.maxBeds === '') {
        maxBeds = '7';
    } else {
        maxBeds = yarg.maxBeds;
    }

    if (yarg.maxDaysOnMarket === undefined || yarg.maxDaysOnMarket === '') {
        maxDaysOnMarket = '30';
    } else {
        maxDaysOnMarket = yarg.maxDaysOnMarket;
    }

    if (yarg.hasGarage === undefined || yarg.hasGarage === '') {
        hasGarage = 'has-garage';
    } else {
        hasGarage = yarg.hasGarage;
    }

    if (yarg.status === undefined || yarg.status === '') {
        status = 'active';
    } else {
        status = yarg.status;
    }



    const data = JSON.stringify({
        "appData": {
            "city": city,
            "propertyType": propertyType,
            "minPrice": minPrice,
            "maxPrice": maxPrice,
            "minBeds": minBeds,
            "maxBeds": maxBeds,
            "maxDaysOnMarket": maxDaysOnMarket,
            "hasGarage": hasGarage,
            "status": status
        }
    });

    fs.writeFileSync('./TestData/SearchCriteria.json', data);
    return data;
}
