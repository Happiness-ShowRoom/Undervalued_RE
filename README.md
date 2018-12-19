# Undervalued RE Finder

Undervalued_RE helps you to locate undervalued Real Estate based on your search criteria, market estimates and government tax assessments.

## Installation

Download and install [Node.js](https://nodejs.org/en/download/) to run the Undervalued_RE.
To install all the required npm modules, on the command line, in the root directory of the framework module, run:


```bash
npm install
```

## Usage
After all the node modules have been downloaded, Navigate to "Configuration" folder and run: "protractor Configuration/conf.js <parameters>"

Parameters are passing after command fallow by "-": example: 
```bash
protractor Configuration/conf.js -c='21136' -p=100 -P=500
```

```bash 
city (-c)
```
 - required, other are optionals, and they have default values. 

Arguments List: 
```bash
 -c, --city             city and state for serching         [string] [required]
  -t, --propertyType     Property Type for serching                     [string] default: 'house+condo+townhouse+multifamily+land'
  -p, --minPrice         Minimum Price for serching                     [number] default: '0'
  -P, --maxPrice         Maximum Price for serching                     [number] default: '999K'
  -b, --minBeds          Minimum Beds for serching                      [number] default: '1'
  -B, --maxBeds          Maximum Beds for serching                      [number] default: '7'
  -d, --maxDaysOnMarket  Max Days On Market for serching                [number] default: '30'
  -g, --hasGarage        Has-Garage for serching                        [string] default: 'has-garage'
  -s, --status           Status of Listing for serching                 [string] default: 'active'
  ```


Results will be outputted to "Results.xlsx" once the execution has finished, showing only those properties listed for less than an estimated market value.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
