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
    var destinationFolder = strToJson.destination;
    var bundleFileName = strToJson.bundleName + ".js";
    var bundleFilePath = path.join(destinationFolder, bundleFileName);

    readSourceFolderFiles(sourceFolder)
    createDistFolder(destinationFolder,bundleFilePath)
})
function readSourceFolderFiles(sourceFolder) {

    fs.readdir(sourceFolder, function (err, filenames) {
        if (err) {
            console.log("error on fetch directory file")
            return;
        }
        filenames.forEach(function (filenames) {

            let filepath = path.join(sourceFolder, filenames)


            fs.readFile(filepath, 'utf8', function (err, filenames) {

                if (err) {

                    console.log(err);
                    return
                }
                    else{
                    console.log(filenames)
                }

            });
        });
    });
}

function createDistFolder(destinationFolder,bundleFilePath) {

    fs.mkdir(destinationFolder, function (err) {
        if (err) {
            console.log("creating dist");
        }

    });

    fs.writeFile(bundleFilePath, 'hello', function (err) {
        if (err)
            return console.log(err);
    });
}


