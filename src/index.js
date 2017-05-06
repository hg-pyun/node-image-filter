/**
 *  Entry Point
 */
const getPixels = require('get-pixels');
const renderer = require('./renderer');

// getPixels Lib
module.exports.getPixels = getPixels;

// renderer
module.exports.preset = renderer.preset;
module.exports.convolution = renderer.convolution;