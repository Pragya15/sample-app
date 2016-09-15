var os = require('os');
var request = require('request');
var morgan = require('morgan');
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    var appInsights = require('applicationinsights').setup().start();
    appInsights.client.commonProperties = {
        "Service name": require("./package.json").name
    };
}
var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));

// api ------------------------------------------------------------
app.get('/api', function (req, res) {
    // Invoke service-b
    request('http://service-b', function (error, response, body) {
         res.send('Hello from service A running on ' + os.hostname() + ' and ' + body);
    });
});

// application -------------------------------------------------------------
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var port = 80;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});
