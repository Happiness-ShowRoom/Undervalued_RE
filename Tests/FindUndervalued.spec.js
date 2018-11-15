let Base = require('../Utilities/Base.js');
let HomePage = require('../Pages/HomePage.js');
let FilterPage = require('../Pages/FilterPage.js');
let ListingPage = require('../Pages/ListingPage.js');
let csv=require('csvtojson');
let fs = require('fs');
let Excel = require('exceljs');
let wb = new Excel.Workbook();
let sh;
let filePath;
let JSON;
let appraisal;
let taxValue;
let listingPrice;
let dataProvider = [];
let rowNumber = 2;



describe('Find undervalued RE based on provided criteria', () => {
    
    beforeAll(function() {
        browser.waitForAngularEnabled(false);
        Base.navigateTo_baseURL();
    });

    it('should download the metadata in csv format based on the search criteria', () => {
        HomePage.provideCity();
        FilterPage.filterResults();
    });

    it('should setup filepath', () => {
        let files = fs.readdirSync('../TestData/');
        console.log(files);

        let latestModified = files[0];
        let counter = 0;

        files.forEach(element => {
            stats = fs.statSync('../TestData/' + element);
            console.log(element);
            console.log(stats.mtime);
            console.log(stats.ctime);
            if(stats.mtime > fs.statSync('../TestData/' + latestModified).mtime) {
                latestModified = files[counter];
            }
            counter++;
        });

        filePath = "../TestData/" + latestModified;
        console.log("latest modified = " + filePath);
    });

    it('should convert csv to json', () => {
        const csvFilePath=filePath;
        csv({flatKeys:true})
            .fromFile(csvFilePath)
            .then((result)=>{
                JSON = result;
            });
    });

    it('should setup data provider', () => {
        for(let i = 0; i < JSON.length; i++) {
            dataProvider.push({URL: JSON[i]['URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)'], Price: JSON[i].PRICE});
        }
    });

    it('should preset excel file untilities', () => {
        wb.xlsx.readFile("../Results/Results.xlsx").then(() => {
            sh = wb.getWorksheet("Sheet1");
        });
    });


    it('should write eligible results to Excel spreadsheet', () => {

        for(let i = 0; i < dataProvider.length; i++) {
            
            browser.get(dataProvider[i].URL);
            browser.sleep(1000);
            
            ListingPage.estimatedPrice.isPresent().then(function (isPresent) {
                if (isPresent) {
                    ListingPage.estimatedPrice.getText().then((result) => {
                        appraisal = result;
                        console.log("==============================");
                        console.log("The appraisal is: " + appraisal);
                        appraisal = parseInt(appraisal.substring(1).replace(',',''));
                        listingPrice = parseInt(dataProvider[i].Price);
                        console.log("The listing price is: " + listingPrice);
                        console.log(`The difference is: ${appraisal-listingPrice}`);
            
                        if(appraisal-listingPrice > 0) {
                            ListingPage.taxValue.isPresent().then((isPresent) => {
                                if(isPresent) {
                                    ListingPage.taxValue.getText().then((result) => {
                                        taxValue = parseInt(result.substring(1).replace(',',''))
                                        console.log(`Tax value :${taxValue}`);

                                        sh.getRow(rowNumber).getCell(1).value = dataProvider[i].URL;
                                        sh.getRow(rowNumber).getCell(2).value = listingPrice;
                                        sh.getRow(rowNumber).getCell(3).value = appraisal;
                                        sh.getRow(rowNumber).getCell(4).value = appraisal-listingPrice;
                                        sh.getRow(rowNumber).getCell(5).value = taxValue;
                                        wb.xlsx.writeFile("../Results/Results.xlsx");
                                        rowNumber++;
                                   });
                               } 
                            });
                        }
                    });  
                } 
            });
        }
    });
});

