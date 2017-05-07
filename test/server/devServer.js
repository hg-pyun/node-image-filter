// default module
const express = require('express');
const fs = require('fs');
const path = require('path');

// filter lib
const Filter = require('../../lib');

const app = express();

app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, '../samples/cat.jpg');
    let invertFilter = function (pixels) {
        let d = pixels;
        for(let i=0; i<pixels.length; i+=4 ){
            d[i] = 255 - d[i];
            d[i+1] = 255 - d[i+1];
            d[i+2] = 255 - d[i+2];
            d[i+3] = 255;
        }
        return pixels;
    };

    Filter.render(imagePath, invertFilter, function (result) {
        fs.writeFile(`result.${result.type}`, result.data);
        res.send('save filtered image');
    })
});


app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
