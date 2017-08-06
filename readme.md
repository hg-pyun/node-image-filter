# node-image-filter
Image Processing Library for nodejs.

## Install
```
$ npm install node-image-filter --save
```

## Basic Usage
### Render
To apply a filter, use the render function.
```
render(imagePath, filter[, options], callback);
```
You can use preset filters or custom filters. callback function receive result data. The data contains image buffer, type, width, height information.
Let's look at the example.

```javascript
const Filter = require('node-image-filter');

// express
app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, '../samples/cat.jpg');

    Filter.render(imagePath, Filter.preset.invert, function (result) {
        /* result format
        {
            data : stream,
            type : 'jpg',
            width : 1024,
            height : 768
        }
        */
        result.data.pipe(fs.createWriteStream(`result.${result.type}`)); // save local
        res.send('save filtered image');
    })
});
```

### Preset Filters
'node-image-filter' includes Preset filters. There are currently four filters in total.
You just need to pass it as the second parameter of the Render function.
```javascript
const Filter = require('node-image-filter');

// filter list
Filter.preset.invert
Filter.preset.grayscale
Filter.preset.sepia
Filter.preset.brightness
```

### Custom Filter
You can also use your own filters. Pass the filter you created yourself as the second parameter.
The filter function takes pixels as a parameter and must process these pixels.data and return.

```javascript
// custom filter
let CustomInvertFilter = function (pixels) {
    var data = pixels.data;
    for(let i=0; i<data.length; i+=4 ){
        data[i] = 255 - data[i];
        data[i+1] = 255 - data[i+1];
        data[i+2] = 255 - data[i+2];
        data[i+3] = 255;
    }
    return data;
};

Filter.render(imagePath, CustomInvertFilter, function (result) {
    result.data.pipe(fs.createWriteStream(`result.${result.type}`)); // save local
    res.send('save filtered image');
})
```

If you want to pass options to a filter, Use the third parameter of the Render function.

```javascript
// custom filter with options
function CustomBrightnessFilter (pixels, options){
    var data = pixels.data;
    var value = options.value || 5;

    for(var i =0; i< data.length; i+=4){
        data[i] += value;
        data[i+1] += value;
        data[i+2] += value;
    }
    return data;
}

// third param for option.
let options = {
    value : 10
};

Filter.render(imagePath, CustomBrightnessFilter, options, function (result) {
    result.data.pipe(fs.createWriteStream(`result.${result.type}`)); // save local
    res.send('save filtered image');
})
```

## Convolution
### Render
You can also use convolution theory such as sobel, sharpen, and others. Here are some examples.
```javascript

// sobel
Filter.render(imagePath, Filter.preset.sobel, function (result) {
    result.data.pipe(fs.createWriteStream(`result.${result.type}`)); // save local
    res.send('save filtered image');
})

// sharpen
Filter.render(imagePath, Filter.preset.sharpen, function (result) {
    result.data.pipe(fs.createWriteStream(`result.${result.type}`)); // save local
    res.send('save filtered image');
})

// blur
let options = {
    value : 100
};

Filter.render(imagePath, Filter.preset.blur, options, function (result) {
    result.data.pipe(fs.createWriteStream(`result.${result.type}`)); // save local
    res.send('save filtered image');
})
```

### Custom Convolution Filter
The usage is very similar to the custom filter. You can make convolution filter using `Filter.convolution(pixels, weights, opaque)`.
Also, You pass option using third parameter.
```javascript
function sobel(pixels) {
    return Filter.convolution(pixels,
           [-1, 0, 1,
            -2, 0, 2,
            -1, 0, 1], 1);
}

Filter.render(imagePath, sobel, function (result) {
    result.data.pipe(fs.createWriteStream(`result.${result.type}`));
    console.log('[DEV Server]', 'Saved Custom Sobel Image');
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
