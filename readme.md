# node-image-filter
Image Processing Library for nodejs.


## Install
```
npm install node-image-filter
```

## Basic Usage
```
// default module
const express = require('express');
const fs = require('fs');
const path = require('path');

// filter lib
const Filter = require('../lib');

const app = express();

app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, '../test/cat.jpg');
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


```

# LICENSE

Copyright (c) 2017 Haegul, PYUN  

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.