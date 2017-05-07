# node-image-filter
Image Processing Library for nodejs.

## Install
```
npm install node-image-filter
```

## Basic Usage
### Render
To apply a filter, use the render function.
```
render(imagePath, filter[, options], callback);
```
You can use preset filters or custom filters. callback function receive result data. The data contains image buffer, type, width, height information.
Let's look at the example.

```
const Filter = require('node-image-filter');

// express
app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, '../samples/cat.jpg');

    Filter.render(imagePath, Filter.preset.invert, function (result) {
        /* result format
        {
            data : array,
            type : 'jpg',
            width : 1024,
            height : 768
        }
        */
        fs.writeFile(`result.${result.type}`, result.data);  // save local
        res.send('save filtered image');
    })
});
```

### Preset Filters
'node-image-filter' include Preset filters. There are currently four filters in total.
You just need to pass it as the second parameter of the Render function.
```
const Filter = require('node-image-filter');

// filter list
Filter.preset.invert
Filter.preset.grayscale
Filter.preset.sepia
Filter.preset.brightness
```

## Custom Filter
You can also use your own filters. Pass the filter you created yourself as the second parameter.
The filter function takes pixels as a parameter and must process these pixels and return them.

```
// custom filter
let CustomInvertFilter = function (pixels) {
    for(let i=0; i<pixels.length; i+=4 ){
        pixels[i] = 255 - pixels[i];
        pixels[i+1] = 255 - pixels[i+1];
        pixels[i+2] = 255 - pixels[i+2];
        pixels[i+3] = 255;
    }
    return pixels;
};

Filter.render(imagePath, CustomInvertFilter, function (result) {
    fs.writeFile(`result.${result.type}`, result.data);
    res.send('save filtered image');
})
```

If you want to pass options to a filter, Use the third parameter of the Render function.

```
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
    fs.writeFile(`result2.${result.type}`, result.data);
    res.send('save filtered image');
})
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