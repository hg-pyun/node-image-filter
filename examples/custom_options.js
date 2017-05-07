// default module
const express = require('express');
const fs = require('fs');
const path = require('path');

// filter lib
const Filter = require('node-image-filter');

const app = express();

app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, 'cat.jpg');

    // custom filter with options
    function CustomBrightnessFilter (pixels, options){
        var value = options.value || 5;

        for(var i =0; i< pixels.length; i+=4){
            pixels[i] += value;
            pixels[i+1] += value;
            pixels[i+2] += value;
        }
        return pixels;
    }

    // third param for option.
    let options = {
        value : 10
    };

    Filter.render(imagePath, CustomBrightnessFilter, options, function (result) {
        fs.writeFile(`result.CustomBrightnessFilter.${result.type}`, result.data);
        res.send('save filtered image');
    })
});


app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
