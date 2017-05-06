// default moudle
const express = require('express');
const fs = require('fs');
const path = require('path');

// lib
const Filter = require('../src');

const app = express();

app.use(function (request, response, next) {
    Filter.getPixels(path.join(__dirname, '../test/image/cat.jpg'), function (err, pixels) {
        if (err) {
            console.log('err', err);
            return;
        }

        console.log('pixels', pixels);
        console.log(pixels.data[0], pixels.data[1], pixels.data[2], pixels.data[3]);
        Filter.preset.invert(pixels);
        console.log(pixels.data[0], pixels.data[1], pixels.data[2], pixels.data[3]);

    });
});

app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
