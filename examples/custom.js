// default module
const express = require('express');
const fs = require('fs');
const path = require('path');

// filter lib
const Filter = require('node-image-filter');

const app = express();

app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, 'cat.jpg');

    // custom filter
    let customInvertFilter = function (pixels) {
        for(let i=0; i<pixels.length; i+=4 ){
            pixels[i] = 255 - pixels[i];
            pixels[i+1] = 255 - pixels[i+1];
            pixels[i+2] = 255 - pixels[i+2];
            pixels[i+3] = 255;
        }
        return pixels;
    };

    Filter.render(imagePath, customInvertFilter, function (result) {
        fs.writeFile(`result.customInvertFilter.${result.type}`, result.data);
        res.send('save filtered image');
    })
});


app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
