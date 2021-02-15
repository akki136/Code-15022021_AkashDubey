import express from 'express';
import request from 'request';

const app = express();
let csvData: Object[] = [];
let tableTemplate = 
    '<style> table, th, td { border: 1px solid black;text-align:center; } </style><table>' +
        '<thead>' +
            '<tr >' +
                '<th>Header /Fields Name List</th>' +
                '<th>Total Size</th>' +
                '<th>Total Number of Rows (Without Header) </th>' +
                
             '</tr>' +
         '</thead>' +
         '<tbody>' +
             '<tr>';

             let innertable = 
    '<style> table, th, td { border: 1px solid black;text-align:center; } </style><table>' +
        '<thead>' +
            '<tr >' +
                '<th>Serial</th>' +
                '<th>Column Name</th>' +
                '</tr>' +
         '</thead>' +
         '<tbody>' ;
            
var defaultUrl= 'https://raw.githubusercontent.com/vamstar/challenge/master/Dataset3.csv';
const options = {
    url: defaultUrl,
    method: 'GET'
};
const path="";
const port = 3000;
app.get('/', (req, res) => {
       
    let url=req.query.url;
    options.url=defaultUrl;
if(url!=undefined && url!=null)
{
    console.log("User input url :: "+url);
    options.url=url.toString(); 
    
}
    request(options, function (error, response, body) {
        if(body==undefined)
        {
            res.send(" Invalid url of csv");
        }else
        {
        var csvArray = body.split("\n");
        var columnsarray=csvArray[0].split(";");

         var table=tableTemplate;
          table=table+"<td>"+getTableInsideColumn(columnsarray)+"</td>";
          var contentLength=response.headers['content-length'];
          table=table+"<td>"+contentLength+"&nbsp;In Bytes ("+getCsvFileSize(Number(contentLength))+")"+"</td>";
          table=table+"<td>"+csvArray.length+"</td></tr></tbody></table>";
          res.send(table);
        }
      
      
});
 
});

function getCsvFileSize(contentLength: number): String {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (contentLength == 0) return '0 Byte';
   const k = 1024;
   const i = Math.floor(Math.log(contentLength) / Math.log(k));
   return parseFloat((contentLength / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    
  }


  function getTableInsideColumn(columnsarray:any):String
  {
    var colString=innertable;
    var counter=1;
    columnsarray.forEach(function (data: any) {
        colString =colString+ "<tr><td> " + counter++ + "</td>";
        colString =colString+ "<td> " + data + "</td></tr>";
        
      }); 
      colString=colString+"</tbody></table>";
      return colString;
  }
app.listen(port, () => {
  
  return console.log(`server is listening on ${port}`);
});