// default module
const express = require('express');
const fs = require('fs');
const path = require('path');

// filter lib
const Filter = require('node-image-filter');

const app = express();

app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, 'cat.jpg');

    let options = {
        value : 10
    };

    Filter.render(imagePath, Filter.preset.brightness, options, function (result) {
        result.data.pipe(fs.createWriteStream(`result.${result.type}`));
        res.send('save filtered image');
    })
});


app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
