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
        var data = pixels.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
            data[i + 3] = 255;
        }
        return data;
    };

    Filter.render(imagePath, customInvertFilter, function (result) {
        result.data.pipe(fs.createWriteStream(`result.${result.type}`));
        res.send('save filtered image');
    })
});


app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
