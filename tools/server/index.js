const express = require('express');
const fs = require('fs');
const path = require('path');

const Canvas = require('canvas');
const Filter = require('../../src');

const getPixels = require('get-pixels');

const app = express();

app.use(function (request, response) {

    // var catImage = fs.readFileSync(path.join(__dirname, '../../test/image/cat.jpg'));
    // var base64File = Filter.converter.fileToBase64(catImage);
    // var imageData = Filter.converter.base64ToImageData(base64File, 'jpeg');

    // var Image = Canvas.Image;

    // fs.readFile(path.join(__dirname, '../../test/image/cat.jpg'), function(err, data){
    //     if (err) throw err;
    //     var img = new Image;
    //     img.src = data;
    //
    //     var canvas = new Canvas(img.width, img.height);
    //     var ctx = canvas.getContext('2d');
    //
    //     // var invertImageData = Filter.renderer.preset.invert(img);
    //
    //     ctx.drawImage(img, 0, 0, img.width, img.height);
    //
    //     response.writeHead(200, { 'Content-Type' : 'text/html'});
    //     response.end('<img src="' + canvas.toDataURL() + '" />');
    // });

    getPixels(path.join(__dirname, '../../test/image/cat.jpg'), function(err, pixels) {
        if(err) {
            return
        }

        var flatArray = [];
        for (var y = 0; y < 3; i++){
            for (var x = 0; x < 3; j++){
                for (var z = 0; z < 4; k++){
                    flatArray.push(pixels.get(x, y, z));
                }
            }
        }

        console.log("got pixels", flatArray);
    });
});

app.listen(8090, function () {
    console.log('Server Running at http://127.0.0.1:8090');
});
