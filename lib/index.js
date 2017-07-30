/**
 *  Entry Point
 */
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const renderer = require('./renderer');

// lib
module.exports.getPixels = getPixels;
module.exports.savePixels = savePixels;

// renderer
module.exports.preset = renderer.preset;
module.exports.convolution = renderer.convolution;


/**
 * render using custom filters.
 * @param path
 * @param filter
 * @param options
 * @param callback
 */
module.exports.render = function (path, filter, options, callback) {

    var useOptions = (typeof options !== "function");
    var op = useOptions ? options : {};
    var cb = useOptions ? callback : options;

    var type = path.split('.').pop();  // split type

    getPixels(path, function (err, pixels) { // load image
        if (err) {
            console.log('node-image-filter', err);
            return;
        }

        filter(pixels.data, op);

        var imagePixels = savePixels(pixels, type);
        var renderObject = {
            data : imagePixels,
            type : type,
            width : pixels.shape[0],
            height : pixels.shape[1]
        };

        cb(renderObject);
    });
};