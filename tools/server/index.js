const express = require('express');
const fs = require('fs');
const path = require('path');

const Filter = require('../../src');

const app = express();

app.use(function (request, response) {

    var catImage = fs.readFileSync(path.join(__dirname, '../../test/image/cat.jpg'));
    var base64Image = Filter.converter.imageToBase64(catImage);
    var imgSrc = Filter.converter.base64ToImageSource(base64Image, 'jpeg');


    response.writeHead(200, { 'Content-Type' : 'text/html'});
    response.end('<img src="'+imgSrc +'" />');

    // var Canvas = require('canvas')
    //     , Image = Canvas.Image
    //     , canvas = new Canvas(200, 200)
    //     , ctx = canvas.getContext('2d');
    //
    // ctx.font = '30px Impact';
    // ctx.rotate(.1);
    // ctx.fillText("Awesome!", 50, 100);
    //
    // var te = ctx.measureText('Awesome!');
    // ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    // ctx.beginPath();
    // ctx.lineTo(50, 102);
    // ctx.lineTo(50 + te.width, 102);
    // ctx.stroke();
    //
    // console.log('<img src="' + canvas.toDataURL() + '" />');
    //
    // response.writeHead(200, { 'Content-Type' : 'text/html'});
    // response.end('<img src="' + canvas.toDataURL() + '" />');
});

app.listen(8090, function () {
    console.log('Server Running at http://127.0.0.1:8090');
});
