module.exports.validatePixelValue = function (pixel) {
    if (pixel < 0)
        return 0;
    else if (pixel > 255)
        return 255;
    else
        return pixel;
};