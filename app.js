var Tesseract = require("tesseract.js");
var request = require("request");
var fs = require("fs");

var url = "https://miro.medium.com/max/2400/0*DRMQMwu8_wqJhIF6.png";
var filename = "image.png";

var writeFile = fs.createWriteStream(filename);

request(url)
    .pipe(writeFile)
    .on("close", function () {
        Tesseract.recognize(filename, {
            lang: "kor",
        })
            .progress(function (p) {
                console.log("progress", p);
            })
            .catch((err) => console.error(err))
            .then(function (result) {
                console.log(result.text);
            });
    });
