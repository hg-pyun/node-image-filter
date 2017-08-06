module.exports = {
    none : function (pixels) {
        return pixels.data;
    },

    invert : function(pixels){
        var data = pixels.data;
        for(var i=0; i<data.length; i+=4 ){
            data[i] = 255 - data[i];
            data[i+1] = 255 - data[i+1];
            data[i+2] = 255 - data[i+2];
            data[i+3] = 255;
        }
        return data;
    },

    grayscale : function (pixels) {
        var data = pixels.data;
        for(var i =0; i< data.length; i+=4){
            var r = data[i];
            var g = data[i+1];
            var b = data[i+2];

            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            data[i] = data[i+1] = data[i+2] = v
        }
        return data;
    },

    sepia : function(pixels){
        var data = pixels.data;
        for(var i =0; i< data.length; i+=4){
            var r = data[i];
            var g = data[i+1];
            var b = data[i+2];

            data[i] = r*0.3588 + g*0.7044 + b*0.1368;
            data[i+1] = r*0.2990 + g*0.5870 + b*0.1140;
            data[i+2] = r*0.2392 + g*0.4696 + b*0.0912;
        }
        return data;
    },

    brightness : function(pixels, options){
        var data = pixels.data;
        var value = options.value || 5;

        for(var i =0; i< data.length; i+=4){
            data[i] += value;
            data[i+1] += value;
            data[i+2] += value;
        }
        return data;
    }
};