"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var request_1 = __importDefault(require("request"));
var app = express_1.default();
var csvData = [];
var tableTemplate = '<style> table, th, td { border: 1px solid black;text-align:center; } </style><table>' +
    '<thead>' +
    '<tr >' +
    '<th>Header /Fields Name List</th>' +
    '<th>Total Size</th>' +
    '<th>Total Number of Rows (Without Header) </th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    '<tr>';
var innertable = '<style> table, th, td { border: 1px solid black;text-align:center; } </style><table>' +
    '<thead>' +
    '<tr >' +
    '<th>Serial</th>' +
    '<th>Column Name</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';
var defaultUrl = 'https://raw.githubusercontent.com/vamstar/challenge/master/Dataset3.csv';
var options = {
    url: defaultUrl,
    method: 'GET'
};
var path = "";
var port = 3000;
app.get('/', function (req, res) {
    var url = req.query.url;
    options.url = defaultUrl;
    if (url != undefined && url != null) {
        console.log("User Input Url :: " + url);
        options.url = url.toString();
    }
    request_1.default(options, function (error, response, body) {
        if (body == undefined) {
            res.send(" Invalid url of Csv");
        }
        else {
            var csvArray = body.split("\n");
            var columnsarray = csvArray[0].split(";");
            var table = tableTemplate;
            table = table + "<td>" + getTableInsideColumn(columnsarray) + "</td>";
            var contentLength = response.headers['content-length'];
            table = table + "<td>" + contentLength + "&nbsp;In Bytes (" + getCsvFileSize(Number(contentLength)) + ")" + "</td>";
            table = table + "<td>" + csvArray.length + "</td></tr></tbody></table>";
            res.send(table);
        }
    });
});
function getCsvFileSize(contentLength) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (contentLength == 0)
        return '0 Byte';
    var k = 1024;
    var i = Math.floor(Math.log(contentLength) / Math.log(k));
    return parseFloat((contentLength / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
function getTableInsideColumn(columnsarray) {
    var colString = innertable;
    var counter = 1;
    columnsarray.forEach(function (data) {
        colString = colString + "<tr><td> " + counter++ + "</td>";
        colString = colString + "<td> " + data + "</td></tr>";
    });
    colString = colString + "</tbody></table>";
    return colString;
}
app.listen(port, function () {
    return console.log("server is listening on " + port);
});
