var fs = require('fs');
var path = require("path");
var http = require("http");
var jsonFile = 'brentconfig.json';

fs.readFile(jsonFile, 'utf8', function (err, jsonfile) {
    if (err) {
        console.log("error on the Json file!");
        return;
    }

    var strToJson = JSON.parse(jsonfile);
    var sourceFolder = strToJson.source;
    readSourceFolderFiles (sourceFolder)
})

function readSourceFolderFiles(sourceFolder) {
    var sourceallfiles = "";
    fs.readdir(sourceFolder, 'utf8', function (err, files) {
        if (err) {

            console.log(arguments);
            return
        }


        for (var i = 0; i < files.length; i++) {

            var filePath = path.join(sourceFolder, files[i]);


            fs.readFile(filePath, 'utf8', function (err, filedata) {
                if (err) {

                    console.log('error on fetching SourceFile!');
                    return
                }

                sourceallfiles += filedata + "\n";
                cb(sourceallfiles);
            });
        }

    });
}