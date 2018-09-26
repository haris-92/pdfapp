var express = require('express');
var router = express.Router();
var pdfFiller   = require('pdffiller-stream');
var path = require('path');
var http = require('http');
var AWS = require('aws-sdk');
var fs = require("fs");
var shouldFlatten = false;
var sourcePDF = "./test2.pdf";
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
    const file = require('fs').createWriteStream('./test2.pdf');
    
    const s3Promise = s3.getObject(getParams).promise();
    
    s3Promise.then((data) => {
      file.write(data.Body, () => {
        file.end();
        
      });
    }).then(()=>{
        pdfFiller.fillFormWithFlatten(sourcePDF, data, shouldFlatten)
        .then((outputStream) => { const Body = outputStream;
        const Bucket = 'pdfbucket12';
        const Key = 'test_complete10.pdf';
        const ContentType = 'application/pdf';
        
        const uploader = new AWS.S3.ManagedUpload({
            params: {Bucket, Key, Body, ContentType},
            service: s3,
        });
        
        uploader.promise().then((data) => {/* do something with AWS response */})
        
    }).catch((err) => {
        console.log(err);
    });
    });
  
 

    res.send('File generated in s3');
    
});



module.exports = router;