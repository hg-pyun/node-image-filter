module.exports = {
    none : function (pixels) {
        return pixels;
    },

    invert : function(pixels){
        var d = pixels.data;
        for(var i=0; i<pixels.data.length; i+=4 ){
            d[i] = 255 - d[i];
            d[i+1] = 255 - d[i+1];
            d[i+2] = 255 - d[i+2];
            d[i+3] = 255;
        }
        return pixels;
    },

    grayScale : function (pixels) {
        var d = pixels.data;
        for(var i =0; i< d.length; i+=4){
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];

            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            d[i] = d[i+1] = d[i+2] = v
        }
        return pixels;
    },

    sepia : function(pixels){
        var d = pixels.data;
        for(var i =0; i< d.length; i+=4){
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];

            d[i] = r*0.3588 + g*0.7044 + b*0.1368;
            d[i+1] = r*0.2990 + g*0.5870 + b*0.1140;
            d[i+2] = r*0.2392 + g*0.4696 + b*0.0912;
        }
        return pixels;
    },

    brightness : function(pixels, value){
        var d = pixels.data;
        for(var i =0; i< d.length; i+=4){
            d[i] += value/3;
            d[i+1] += value/3;
            d[i+2] += value/3;
        }
        return pixels;
    },

    sharpen : function(pixels, value, convolve){
        return convolve(pixels,
            [ -1, -1,  -1,
                -1,  value/8,  -1,
                -1, -1,  -1 ], 1);
    },

    sobel : function (pixels, value, convolve) {
        return convolve(pixels,
            [ -1/(value/10),  0,  1/(value/10),
                -2/(value/10),  0,  2/(value/10),
                -1/(value/10),  0,  1/(value/10) ], 1);
    },

    blur : function (pixels, value, convolve) {

        var offset = 1/(value/10);

        return convolve(pixels,
            [offset,  offset,  offset,
                offset,  offset,  offset,
                offset,  offset,  offset ], 1);
    }
};