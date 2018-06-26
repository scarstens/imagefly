const request = require('request');
const sharp = require('sharp');

module.exports = function transmute(req, res, next, path, options) {
    let imageReadStream, width, height, format, transmutation = {};
    let quality = 80;
    let transform = sharp();
    console.log('Path: ' + path)

    if( path.indexOf('http') > -1 ) {
        console.log('URL Found.');
        imageReadStream = request.get(path)
        .on('response', function(response) {
            console.log('::IMAGE-READ-STREAM::');
            console.log(response.statusCode); // like 200
            if( 200 !== response.statusCode ) {
                next();
                return;
            }
            console.log(response.headers['content-type']); // like 'image/png'

            if (options.width) {
                width = parseInt(options.width);
            }
            if (options.height) {
                height = parseInt(options.height);
            }
            if( options.quality ){
                quality = parseInt(options.quality);
                console.log('Quality set to: ' + quality);
            }
        
            console.log(req.headers.accept);
            if( ('false' !== options.auto_webp) && req.headers.accept.indexOf('webp') ){
                format = 'webp';
                console.log('transform to format: webp');
            } else if (options.format) {
                format = options.format;
                console.log('transform to format: ' + format);
            } 
            res.type('image/' + format);
            res.header('Content-disposition', 'inline; filename=' + options.file_data.name + '.' + format);
            transform = transform.toFormat(format, { quality: quality });
        
            if (width || height) {
                transform = transform.resize(width, height);
            }

          });
    } else {
        console.log('File Found.');
        imageReadStream = request.get('file://'+path);
    }

    transmutation = {
        req: req,
        res: res,
        imageReadStream: imageReadStream.pipe(transform),
    };
    return transmutation;
}
