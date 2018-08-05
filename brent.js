var fs = require('fs');
var path = require("path");
var http = require("http");
var url=require("url");

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
console.log(distFilePath)
    var htmlfile= 'index.html';
    var distPathCreateHtml =path.join(destinationFolder,htmlfile)

    readSourceFolderFiles(sourceFolder,function (filenames) {

        createDistFolder(destinationFolder,distFilePath,distPathCreateHtml,function () {

            writefile(distFilePath,filenames);
        readHtmlFile(htmlfile,function (html) {
            var produceHtml=addScriptIntoHtml(html,bundleFileJs)
            writefile(distPathCreateHtml,produceHtml);
            console.log(produceHtml)
        })
    })

    })
    createServer(distFilePath)
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

function createDistFolder(destinationFolder,distFilePath,htmlPath,cb) {

    if(fs.existsSync(distFilePath)){
        fs.unlinkSync(distFilePath)
    }
    if (fs.existsSync(htmlPath)) {
        fs.unlinkSync(htmlPath);
    }
    if (fs.existsSync(destinationFolder)) {
        fs.rmdirSync(destinationFolder);

    }

    fs.mkdir(destinationFolder, function (err) {
        if (err) {
            console.log(" not creating dist");
        }
        else {
            cb()
        }

    });

}

function writefile(distFilePath,filenames) {
    fs.writeFile(distFilePath, filenames, function (err) {
        if (err) {
            return console.log('error');
        }

    });

}
function readHtmlFile(htmlfile,cb){
fs.readFile(htmlfile, 'utf8', function (err,html) {
    if (err) {

        console.log(err);
        return
    }

    cb(html)



})
}

function addScriptIntoHtml(htmlString,bundleFileJs) {
    var appendString ="<script src='" +bundleFileJs + "'" + "></script>";
    var splitTheHtml = htmlString.split('<body>').join('<body>' +'\n'+ appendString)
    return splitTheHtml;

}



function createServer(distFilePath) {
    var server = http.createServer(function (request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        response.writeHead(200);

        if (pathname == "/") {
            html = fs.readFileSync(distFilePath, "utf8");
            response.write(html);
        } else if (pathname =="/") {
            bundle = fs.readFileSync(distFilePath, "utf8");
            response.write(bundle);
        }
        response.end();
    });
    server.listen(3000);

    console.log("Listening to server on 3000...");
}


