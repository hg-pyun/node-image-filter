module.exports = {
    none : function (pixels) {
        return pixels;
    },

    invert : function(pixels){
        for(var i=0; i<pixels.length; i+=4 ){
            pixels[i] = 255 - pixels[i];
            pixels[i+1] = 255 - pixels[i+1];
            pixels[i+2] = 255 - pixels[i+2];
            pixels[i+3] = 255;
        }
        return pixels;
    },

    grayscale : function (pixels) {
        for(var i =0; i< pixels.length; i+=4){
            var r = pixels[i];
            var g = pixels[i+1];
            var b = pixels[i+2];

            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            pixels[i] = pixels[i+1] = pixels[i+2] = v
        }
        return pixels;
    },

    sepia : function(pixels){
        for(var i =0; i< pixels.length; i+=4){
            var r = pixels[i];
            var g = pixels[i+1];
            var b = pixels[i+2];

            pixels[i] = r*0.3588 + g*0.7044 + b*0.1368;
            pixels[i+1] = r*0.2990 + g*0.5870 + b*0.1140;
            pixels[i+2] = r*0.2392 + g*0.4696 + b*0.0912;
        }
        return pixels;
    },

    brightness : function(pixels, options){

        var value = options.value || 5;

        for(var i =0; i< pixels.length; i+=4){
            pixels[i] += value;
            pixels[i+1] += value;
            pixels[i+2] += value;
        }
        return pixels;
    }
};