var express = require('express');
var router = express.Router();
var pdfFiller   = require('pdffiller-stream');
var path = require('path');
var http = require('http');
var AWS = require('aws-sdk');
var fs = require("fs");
var shouldFlatten = false;
var sourcePDF = "./test.pdf";
var destinationPDF =  "./test_complete3.pdf";
var data = {
    "last_name" : "siripothu",
    "first_name" : "harish",
    "date" : "Jan 1, 2013",
    "football" : "Off",
    "baseball" : "Yes",
    "basketball" : "Off",
    "hockey" : "Yes",
    "nascar" : "Off"
};

AWS.config.loadFromPath('config.json');

var getParams = {
    Bucket: 'pdfbucket12', //replace example bucket with your s3 bucket name
    Key: 'test.pdf' // replace file location with your s3 file location
}
  //get all tasks


router.get('/generatepdf',function(req,res,next){

    var s3 = new AWS.S3();
    var Data;
    // s3.getObject(getParams, function(err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else   this.Data = data.Body;        
    // });

    var url = s3.getSignedUrl('getObject', getParams);
  console.log(url);
    // pdfFiller.fillFormWithFlatten( url, data, shouldFlatten, function(err) {
    //     if (err) console.log(err);
    //     console.log("In callback (we're done).");
    // });
    pdfFiller.fillFormWithFlatten(sourcePDF, data, shouldFlatten)
    .then((outputStream) => { const Body = outputStream;
    const Bucket = 'pdfbucket12';
    const Key = 'test_complete3.pdf';
    const ContentType = 'application/pdf';
    
    const uploader = new AWS.S3.ManagedUpload({
        params: {Bucket, Key, Body, ContentType},
        service: s3,
    });
    
    uploader.promise().then((data) => {/* do something with AWS response */})
    
}).catch((err) => {
    console.log(err);
});

    res.send('File generated in s3');
    
});



module.exports = router;