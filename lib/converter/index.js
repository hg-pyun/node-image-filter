module.exports.fileToBase64 = function (file) {
    return new Buffer(file).toString('base64');
};

module.exports.base64ToImageData = function (base64Data, type) {
    return 'data:image/'+type+';base64,'+base64Data;
};