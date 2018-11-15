var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should download the metadata in csv format based on the search criteria|Find undervalued RE based on provided criteria",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "security 0 [Report Only] Refused to load the script 'https://s.pinimg.com/ct/core.js' because it violates the following Content Security Policy directive: \"script-src 'unsafe-eval' 'unsafe-inline' 'self' *.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://js-agent.newrelic.com https://bam.nr-data.net *.akamaihd.net *.gstatic.com *.facebook.net *.facebook.com *.google.com https://maps.googleapis.com *.ggpht.com *.parcelstream.com parcelstream.com https://media.twiliocdn.com blob: *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265689946,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265690071,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s.pinimg.com/ct/core.js 0 [Report Only] Refused to load the script 'https://s.pinimg.com/ct/lib/main.4a81c615.js' because it violates the following Content Security Policy directive: \"script-src 'unsafe-eval' 'unsafe-inline' 'self' *.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://js-agent.newrelic.com https://bam.nr-data.net *.akamaihd.net *.gstatic.com *.facebook.net *.facebook.com *.google.com https://maps.googleapis.com *.ggpht.com *.parcelstream.com parcelstream.com https://media.twiliocdn.com blob: *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265690171,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265690271,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s.pinimg.com/ct/lib/main.4a81c615.js 0 [Report Only] Refused to connect to 'https://ct.pinterest.com/user/?tid=2612774090428&cb=1542265690811' because it violates the following Content Security Policy directive: \"connect-src 'self' https://www.redfin.com it-help.redfin.com https://p.tvpixel.com https://*.g.doubleclick.net *.google-analytics.com *.akamaihd.net https://*.facebook.com https://*.google.com https://*.twilio.com wss://tsock.twilio.com *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265690811,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/ - [Report Only] Refused to load the image 'https://ct.pinterest.com/v3/?tid=2612774090428&ad=%7B%22loc%22%3A%22https%3A%2F%2Fwww.redfin.com%2F%22%2C%22ref%22%3A%22%22%2C%22if%22%3Afalse%2C%22sh%22%3A900%2C%22sw%22%3A1600%7D&cb=1542265690813' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265690814,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/ - [Report Only] Refused to load the image 'https://pinterest.adsymptotic.com/d/px/?_pid=15259&_psign=ea8d60e7c75f764ced0e59cae21f634a&_puuid=&_setcookie=false&_redirect=https%3A%2F%2Fct.pinterest.com%2Fdb%2F%3Fpartner_id%3DDRAWBRIDGE%26cookie_id%3D%24%7BUUID%7D%26db_info%3DTWc9PSZtUmR0WTdkalIrVjRqNEw4U3k5NTg3VzBaVGlnQ2kzWGRPVjNqWTdqVmxINUJOVjk2eE1RbnlHWVNUKzI2cWxPbU90VkxoeEhNUkJzM3NlSlg0U09zRzMvcEtuVTkrR0Npcm55dy9qbldaTFovT2RRYmxyeXZtNjZoZkxuSGY1M3E1cS9oaEtvcUx5eWkzZWFzdTFSSFE9PSZzejlObTN1MkNYVzNzaTJLVk9ja0xxSDRNWWM9&_rand=1542265689564000000' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265691069,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265691070,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265691070,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/ - [Report Only] Refused to load the image 'https://ct.pinterest.com/db/?partner_id=DRAWBRIDGE&cookie_id=&db_info=TWc9PSZtUmR0WTdkalIrVjRqNEw4U3k5NTg3VzBaVGlnQ2kzWGRPVjNqWTdqVmxINUJOVjk2eE1RbnlHWVNUKzI2cWxPbU90VkxoeEhNUkJzM3NlSlg0U09zRzMvcEtuVTkrR0Npcm55dy9qbldaTFovT2RRYmxyeXZtNjZoZkxuSGY1M3E1cS9oaEtvcUx5eWkzZWFzdTFSSFE9PSZzejlObTN1MkNYVzNzaTJLVk9ja0xxSDRNWWM9' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265691226,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265691227,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/ - [Report Only] Refused to load the image 'https://cx.atdmt.com/?c=5483912993197433937&f=AYy2ajglDcVYbwWCFyGCueWTSxFhvmRpe1tQPtFiwMtpCSuxSVTr55qsIX3jrRcz5aXLNHNgTlQdnubXrm-hyG1z&id=851728468185585&l=3&v=0' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265691467,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265691565,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265691759,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://connect.facebook.net/en_US/fbevents.js 24:14655 \"[Facebook Pixel] - Duplicate Pixel ID: 851728468185585.\"",
                "timestamp": 1542265695183,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "security 0 [Report Only] Refused to load the script 'https://s.pinimg.com/ct/core.js' because it violates the following Content Security Policy directive: \"script-src 'unsafe-eval' 'unsafe-inline' 'self' *.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://js-agent.newrelic.com https://bam.nr-data.net *.akamaihd.net *.gstatic.com *.facebook.net *.facebook.com *.google.com https://maps.googleapis.com *.ggpht.com *.parcelstream.com parcelstream.com https://media.twiliocdn.com blob: *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265695623,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s.pinimg.com/ct/core.js 0 [Report Only] Refused to load the script 'https://s.pinimg.com/ct/lib/main.4a81c615.js' because it violates the following Content Security Policy directive: \"script-src 'unsafe-eval' 'unsafe-inline' 'self' *.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://js-agent.newrelic.com https://bam.nr-data.net *.akamaihd.net *.gstatic.com *.facebook.net *.facebook.com *.google.com https://maps.googleapis.com *.ggpht.com *.parcelstream.com parcelstream.com https://media.twiliocdn.com blob: *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265695736,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265695745,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s.pinimg.com/ct/lib/main.4a81c615.js 0 [Report Only] Refused to connect to 'https://ct.pinterest.com/user/?tid=2612774090428&cb=1542265695781' because it violates the following Content Security Policy directive: \"connect-src 'self' https://www.redfin.com it-help.redfin.com https://p.tvpixel.com https://*.g.doubleclick.net *.google-analytics.com *.akamaihd.net https://*.facebook.com https://*.google.com https://*.twilio.com wss://tsock.twilio.com *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265695781,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/city/250/VA/Alexandria - [Report Only] Refused to load the image 'https://ct.pinterest.com/v3/?tid=2612774090428&ad=%7B%22loc%22%3A%22https%3A%2F%2Fwww.redfin.com%2Fcity%2F250%2FVA%2FAlexandria%22%2C%22ref%22%3A%22https%3A%2F%2Fwww.redfin.com%2F%22%2C%22if%22%3Afalse%2C%22sh%22%3A900%2C%22sw%22%3A1600%7D&cb=1542265695782' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265695782,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/city/250/VA/Alexandria - [Report Only] Refused to load the image 'https://pinterest.adsymptotic.com/d/px/?_pid=15259&_psign=ea8d60e7c75f764ced0e59cae21f634a&_puuid=&_setcookie=false&_redirect=https%3A%2F%2Fct.pinterest.com%2Fdb%2F%3Fpartner_id%3DDRAWBRIDGE%26cookie_id%3D%24%7BUUID%7D%26db_info%3DTWc9PSZveUlVWGZDY1ZhTmZUeitNNkdOcHhpRng4K0tpQ0FtYzRYMkl3WXRKb056VGkvdFcxY2Z4S0hVeTVEUzNXREdIdXluUnJKNmxocEZwcXIzR041MDF2ODBqcWZYWnh6b285elVSV0hocDdTdW04M0dwdEQ1OC9NSndiVjV6N3ppNHo2dG43aE9WWER3VEFibzVTZ3FjQ0E9PSZMYktabndpc2pVR1IrKzg5Y0ZJeWMzTHM0RHc9&_rand=1542265694394000000' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265695805,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/city/250/VA/Alexandria - [Report Only] Refused to load the image 'https://ct.pinterest.com/db/?partner_id=DRAWBRIDGE&cookie_id=&db_info=TWc9PSZveUlVWGZDY1ZhTmZUeitNNkdOcHhpRng4K0tpQ0FtYzRYMkl3WXRKb056VGkvdFcxY2Z4S0hVeTVEUzNXREdIdXluUnJKNmxocEZwcXIzR041MDF2ODBqcWZYWnh6b285elVSV0hocDdTdW04M0dwdEQ1OC9NSndiVjV6N3ppNHo2dG43aE9WWER3VEFibzVTZ3FjQ0E9PSZMYktabndpc2pVR1IrKzg5Y0ZJeWMzTHM0RHc9' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265695933,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265695934,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265695939,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265695939,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265696029,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265696336,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "security 0 [Report Only] Refused to load the script 'https://s.pinimg.com/ct/core.js' because it violates the following Content Security Policy directive: \"script-src 'unsafe-eval' 'unsafe-inline' 'self' *.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://js-agent.newrelic.com https://bam.nr-data.net *.akamaihd.net *.gstatic.com *.facebook.net *.facebook.com *.google.com https://maps.googleapis.com *.ggpht.com *.parcelstream.com parcelstream.com https://media.twiliocdn.com blob: *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265699275,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s.pinimg.com/ct/core.js 0 [Report Only] Refused to load the script 'https://s.pinimg.com/ct/lib/main.4a81c615.js' because it violates the following Content Security Policy directive: \"script-src 'unsafe-eval' 'unsafe-inline' 'self' *.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://js-agent.newrelic.com https://bam.nr-data.net *.akamaihd.net *.gstatic.com *.facebook.net *.facebook.com *.google.com https://maps.googleapis.com *.ggpht.com *.parcelstream.com parcelstream.com https://media.twiliocdn.com blob: *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265699372,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://s.pinimg.com/ct/lib/main.4a81c615.js 0 [Report Only] Refused to connect to 'https://ct.pinterest.com/user/?tid=2612774090428&cb=1542265699399' because it violates the following Content Security Policy directive: \"connect-src 'self' https://www.redfin.com it-help.redfin.com https://p.tvpixel.com https://*.g.doubleclick.net *.google-analytics.com *.akamaihd.net https://*.facebook.com https://*.google.com https://*.twilio.com wss://tsock.twilio.com *.walkme.com https://rapi.getjaco.com\".\n",
                "timestamp": 1542265699399,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/city/250/VA/Alexandria/filter/property-type=house+townhouse,min-price=400k,max-price=500k,min-beds=2,min-baths=0,status=active - [Report Only] Refused to load the image 'https://ct.pinterest.com/v3/?tid=2612774090428&ad=%7B%22loc%22%3A%22https%3A%2F%2Fwww.redfin.com%2Fcity%2F250%2FVA%2FAlexandria%2Ffilter%2Fproperty-type%3Dhouse%2Btownhouse%2Cmin-price%3D400k%2Cmax-price%3D500k%2Cmin-beds%3D2%2Cmin-baths%3D0%2Cstatus%3Dactive%22%2C%22ref%22%3A%22%22%2C%22if%22%3Afalse%2C%22sh%22%3A900%2C%22sw%22%3A1600%7D&cb=1542265699400' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265699400,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265699401,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/city/250/VA/Alexandria/filter/property-type=house+townhouse,min-price=400k,max-price=500k,min-beds=2,min-baths=0,status=active - [Report Only] Refused to load the image 'https://pinterest.adsymptotic.com/d/px/?_pid=15259&_psign=ea8d60e7c75f764ced0e59cae21f634a&_puuid=&_setcookie=false&_redirect=https%3A%2F%2Fct.pinterest.com%2Fdb%2F%3Fpartner_id%3DDRAWBRIDGE%26cookie_id%3D%24%7BUUID%7D%26db_info%3DTWc9PSZvb3JoRzc4TEFYelFHdDRlamZETWRDYnRlS2gzR3lvblF5dzE2TGRNa2RTb095TkhhTWRIU0JaRjBBNDBEdWFxbjBKQ3FoeXFPUExuek5iaDZtdlQ4ZlZxM0svSlRYY243bjhKWFlJN3JHOTg0eElTVG55dDhYNGxONmpkYVhaWmIvaGh5VGFKeUZuYk94eE5ZQ0tZSFE9PSY1SHpqQnAzRTRobzkwUXNNMGNlVTd5WEY2TDA9&_rand=1542265698628000000' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265699431,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/city/250/VA/Alexandria/filter/property-type=house+townhouse,min-price=400k,max-price=500k,min-beds=2,min-baths=0,status=active - [Report Only] Refused to load the image 'https://ct.pinterest.com/db/?partner_id=DRAWBRIDGE&cookie_id=&db_info=TWc9PSZvb3JoRzc4TEFYelFHdDRlamZETWRDYnRlS2gzR3lvblF5dzE2TGRNa2RTb095TkhhTWRIU0JaRjBBNDBEdWFxbjBKQ3FoeXFPUExuek5iaDZtdlQ4ZlZxM0svSlRYY243bjhKWFlJN3JHOTg0eElTVG55dDhYNGxONmpkYVhaWmIvaGh5VGFKeUZuYk94eE5ZQ0tZSFE9PSY1SHpqQnAzRTRobzkwUXNNMGNlVTd5WEY2TDA9' because it violates the following Content Security Policy directive: \"img-src 'self' data: *.cdn-redfin.com https://ssl.cdn-redfin.com *.google-analytics.com https://www.googleadservices.com *.scorecardresearch.com https://*.g.doubleclick.net https://bat.bing.com https://*.adition.com *.googletagmanager.com https://p.tvpixel.com https://*.cogocast.net https://*.rlcdn.com https://*.fbsbx.com *.akamaihd.net *.facebook.net *.facebook.com *.google.com *.fbcdn.net *.walk.sc https://maps.googleapis.com *.ggpht.com *.gstatic.com *.googleapis.com *.parcelstream.com parcelstream.com *.matterport.com https://www.brimg.net *.walkme.com *.cloudfront.net http://media.cdn-redfin.com\".\n",
                "timestamp": 1542265699453,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265699474,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265699519,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265699519,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265699561,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.redfin.com/stingray/do/csp-violation - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542265699591,
                "type": ""
            }
        ],
        "screenShotFile": "images\\007e00b4-00d5-00f1-0049-007a003f0099.png",
        "timestamp": 1542265691875,
        "duration": 18762
    },
    {
        "description": "should setup filepath|Find undervalued RE based on provided criteria",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00f2006a-00a9-001b-0025-00dd00bc0026.png",
        "timestamp": 1542265711173,
        "duration": 4
    },
    {
        "description": "should convert csv to json|Find undervalued RE based on provided criteria",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00df003a-005f-006e-006c-002c007600c4.png",
        "timestamp": 1542265711673,
        "duration": 2
    },
    {
        "description": "should setup data provider|Find undervalued RE based on provided criteria",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00840074-00e7-0015-00a5-005d009d0005.png",
        "timestamp": 1542265712233,
        "duration": 1
    },
    {
        "description": "should preset excel file untilities|Find undervalued RE based on provided criteria",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 12200,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\004c004c-0073-0044-0003-00fa00d800a6.png",
        "timestamp": 1542265712729,
        "duration": 2
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
