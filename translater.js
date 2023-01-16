const { PdfApi } = require("asposepdfcloud");
const { TextReplaceListRequest }= require("asposepdfcloud/src/models/textReplaceListRequest");
const { TextReplace }= require("asposepdfcloud/src/models/textReplace");

// Client ID, Client Secret
pdfApi = new PdfApi("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
var fs = require('fs');

const name = "teste.pdf";
const remoteTempFolder = "C:\\";
const localTestDataFolder = "C:\\";
const path = remoteTempFolder + "\\" + name;
const outputFile= "teste_replace.pdf";


// Upload File
pdfApi.uploadFile(path, fs.readFileSync(localTestDataFolder + "\\" + name)).then((result) => {  
                     console.log("Uploaded File");    
                    }).catch(function(err) {
    // Deal with an error
    console.log(err);
});
    
const textReplace= new TextReplace();
        textReplace.oldValue= "Hello"; 
        textReplace.newValue= "Olá";
        textReplace.regex= false;

const textReplace1= new TextReplace();
        textReplace1.oldValue= "Bruno"; 
        textReplace1.newValue= "Fox";
        textReplace1.regex= false;
    
const trr = new TextReplaceListRequest();
            trr.textReplaces = [textReplace,textReplace1];


// Replace text
pdfApi.postDocumentTextReplace(name, trr, null, remoteTempFolder).then((result) => {    
    console.log(result.body.code);                  
}).catch(function(err) {
    // Deal with an error
    console.log(err);
});

//Download file
const outputPath = "path\\" + outputFile;

pdfApi.downloadFile(path).then((result) => {    
  fs.writeFileSync(outputPath, result.body);
    console.log("File Downloaded");    
}).catch(function(err) {
    // Deal with an error
    console.log(err);
});