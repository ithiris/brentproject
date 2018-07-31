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
    readSourceFolderFiles(sourceFolder)
})
function readSourceFolderFiles(sourceFolder) {

    fs.readdir(sourceFolder, function (err, filenames) {
        if (err) {
            console.log("error on fetch directory file")
            return;
        }
        filenames.forEach(function (filenames) {

            let filepath = path.join(sourceFolder, filenames)
            console.log(filepath)

            fs.readFile(filepath, 'utf8', function (err, filenames) {
                if (err) {

                    console.log(err);
                    return
                }


            });
        });
    });
}
