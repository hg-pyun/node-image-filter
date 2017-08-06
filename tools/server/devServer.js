// default module
const express = require('express');
const fs = require('fs');
const path = require('path');

// filter lib
const Filter = require('../../lib');

const app = express();

app.get('/favicon.ico', function (req, res) {
    res.status(204);
});

app.use('/', function (req, res, next) {

    const imagePathJPG = path.join(__dirname, '../samples/cat.jpg');
    const imagePathPNG = path.join(__dirname, '../samples/cat.png');

    // basic
    Filter.render(imagePathJPG, Filter.preset.invert, function (result) {
        result.data.pipe(fs.createWriteStream(`result.invert.${result.type}`));
        console.log('[DEV Server]', 'Saved Invert JPG');
    });

    Filter.render(imagePathPNG, Filter.preset.invert, function (result) {
        result.data.pipe(fs.createWriteStream(`result.invert.${result.type}`));
        console.log('[DEV Server]', 'Saved Invert PNG');
    });

    // convolution
    Filter.render(imagePathJPG, Filter.preset.sobel, function (result) {
        result.data.pipe(fs.createWriteStream(`result.sobel.${result.type}`));
        console.log('[DEV Server]', 'Saved Sobel JPG');
    });

    Filter.render(imagePathJPG, Filter.preset.sharpen, function (result) {
        result.data.pipe(fs.createWriteStream(`result.sharpen.${result.type}`));
        console.log('[DEV Server]', 'Saved Sharpen JPG');
    });

    Filter.render(imagePathJPG, Filter.preset.blur, function (result) {
        result.data.pipe(fs.createWriteStream(`result.blur.${result.type}`));
        console.log('[DEV Server]', 'Saved Blur JPG');
    });

    // custom Filters
    function sobel(pixels) {
        return Filter.convolution(pixels,
               [-1, 0, 1,
                -2, 0, 2,
                -1, 0, 1], 1);
    }

    Filter.render(imagePathJPG, sobel, function (result) {
        result.data.pipe(fs.createWriteStream(`result.custom.sobel.${result.type}`));
        console.log('[DEV Server]', 'Saved Custom Sobel JPG');
    });

    console.log('[DEV Server]', 'Send Response');
    res.send('Save filtered image');
});


app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
