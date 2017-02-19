module.exports.imageToBase64 = function (file) {
    return new Buffer(file).toString('base64');
};

module.exports.base64ToImageSource = function (data, type) {
    return 'data:image/'+type+';base64,'+data;
};