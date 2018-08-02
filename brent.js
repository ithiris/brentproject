var fs = require('fs');
var path = require("path");
var http = require("http");
var JsonObjFile = 'brentconfig.json';

fs.readFile(JsonObjFile, 'utf8', function (err, JsonObjFile) {
    if (err) {
        console.log("error on the Json file!");
        return;
    }

    var strToJson = JSON.parse(JsonObjFile);
    var sourceFolder = strToJson.source;

    var destinationFolder = strToJson.destination;
    var bundleFileJs = strToJson.bundleName + ".js";
    var distFilePath = path.join(destinationFolder, bundleFileJs);


    readSourceFolderFiles(sourceFolder,function (filenames) {
        console.log(filenames)
        createDistFolder(destinationFolder,distFilePath)
        writefile(distFilePath,filenames)
    })



})

function readSourceFolderFiles(sourceFolder,cb) {

    var groupOfAllFiles = "";

    fs.readdir(sourceFolder, function (err,filenames) {
        if (err) {
            console.log("error on fetch directory file")
            return;
        }
        filenames.forEach(function (filenames) {

            let filepath = path.join(sourceFolder,filenames)


            fs.readFile(filepath, 'utf8', function (err,filenames) {

                if (err) {

                    console.log(err);
                    return
                }

                groupOfAllFiles += filenames + "\n";
                cb(groupOfAllFiles)


            });
        });

    });


}

function createDistFolder(destinationFolder,distFilePath) {

    fs.mkdir(destinationFolder, function (err, data) {
        if (err) {
            console.log(" not creating dist");
        }
        else {
            console.log("creating dist")
        }
    });

}

function writefile(distFilePath,filenames) {
    fs.writeFile(distFilePath, filenames, function (err, data) {
        if (err) {
            return console.log('error');
        }
        else {
            console.log("data is saved")
        }
    });

}


