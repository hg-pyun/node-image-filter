// default module
const express = require('express');
const fs = require('fs');
const path = require('path');

// filter lib
const Filter = require('../../lib');

const app = express();

app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, '../samples/cat.jpg');

    Filter.render(imagePath, Filter.preset.invert, function (result) {
        fs.writeFile(`result.${result.type}`, result.data);
        res.send('save filtered image');
    });
});


app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});
