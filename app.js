var pdfFiller   = require('pdffiller');

var shouldFlatten = false;
var sourcePDF = "./test.pdf";
var destinationPDF =  "./test_complete1.pdf";
var data = {
    "last_name" : "kumar",
    "first_name" : "mani",
    "date" : "Jan 1, 2013",
    "football" : "Off",
    "baseball" : "Yes",
    "basketball" : "Off",
    "hockey" : "Yes",
    "nascar" : "Off"
};

 
pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
});

var pdfFiller   = require('pdffiller');
 
var sourcePDF = "./VIPRRefiFL.PDF";
 
// Override the default field name regex. Default: /FieldName: ([^\n]*)/
var nameRegex = null;  
 
var FDF_data = pdfFiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) {
    if (err) throw err;
    console.log(fdfData);
});
 