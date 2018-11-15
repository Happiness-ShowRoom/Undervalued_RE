# Undervalued RE Finder

Undervalued_RE helps you to locate undervalued Real Estate based on your search criteria, market estimates and government tax assessments.

## Installation

Download [Node.js](https://nodejs.org/en/download/) to run the Undervalued_RE.
To create a package.json file, on the command line, in the root directory of the framework module, run:


```bash
npm init
```

## Usage
After all the node modules have been downloaded, navigate to "TestData" folder, open the "SearchCriteria.json" file and specify the criteria for your query.   

```
"appData":{
        "city": "Arlington, TX",
        "propertyType": "house+townhouse",
        "minPrice": "400k",
        "maxPrice": "500k",
        "minBeds" : "2",
        "maxBeds" : "5",
        "maxDaysOnMarket" : "30",
        "hasGarage" : "has-garage",
        "status" : "active"
    }
```
Navigate to "Configuration" folder and run:

```
protractor conf.js
```

Results will be outputted to "Results.xlsx" once the execution has finished.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
