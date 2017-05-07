# node-image-filter
Image Processing Library for nodejs.

## Install
```
npm install node-image-filter
```

## Usage

### Basic
To apply a filter, use the render function.
- imagePath : Image URL path.
- filter : filter function.
- callback : result callback.
```
render(imagePath, filter, callback);
```
callback func receive result data. The data contains image buffer, type, width, height information.

```
const Filter = require('node-image-filter');

// express
app.use(function (req, res, next) {

    let imagePath = path.join(__dirname, '../samples/cat.jpg');

    Filter.render(imagePath, Filter.preset.invert, function (result) {
        /* result
        {
            data : array,
            type : 'jpg',
            width : 1024,
            height : 768
        }
        */
        fs.writeFile(`result.${result.type}`, result.data);
        res.send('save filtered image');
    })
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