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
    fs.readdir(sourceFolder, function(err, filenames) {
        if (err) {
           console.log("error on fetch directory file")
            return;
        }
        filenames.forEach(function(filename) {
            fs.readFile(sourceFolder + filename, 'utf-8', function(err, content) {
                if (err) {
                    console.log(err)
                    return;
                }

            });
        });
    });
}