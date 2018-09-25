// var pdfFiller   = require('pdffiller');

// var shouldFlatten = false;
// var sourcePDF = "./test.pdf";
// var destinationPDF =  "./test_complete1.pdf";
// var data = {
//     "last_name" : "kumar",
//     "first_name" : "mani",
//     "date" : "Jan 1, 2013",
//     "football" : "Off",
//     "baseball" : "Yes",
//     "basketball" : "Off",
//     "hockey" : "Yes",
//     "nascar" : "Off"
// };

 
// pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
//     if (err) throw err;
//     console.log("In callback (we're done).");
// });

// var pdfFiller   = require('pdffiller');
 
// var sourcePDF1 = "./VIPRRefiFL.PDF";
 
// // Override the default field name regex. Default: /FieldName: ([^\n]*)/
// var nameRegex = null;  
 
// var FDF_data = pdfFiller.generateFDFTemplate( sourcePDF1, nameRegex, function(err, fdfData) {
//     if (err) throw err;
//     console.log(fdfData);
// });
var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyPharser = require('body-parser');

var pdf =require('./routes/api');


var app = express();
var port = 3000;

//enable cors
app.use(cors());





//body-pharser set up

app.use(bodyPharser.json());
app.use(bodyPharser.urlencoded({extended:false}));

app.use('/',pdf);
app.use('/api',pdf);

app.listen(port,function(){

    console.log('Listenting to port 3000');
})