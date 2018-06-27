const sharp = require('sharp');
const streamifier = require('streamifier');

module.exports = function Transmute(req, image, options) {
  let width, height, format, transmutation = {};
  let quality = 80;
  let transform = sharp().withoutEnlargement();

  if (options.width) {
    width = parseInt(options.width);
  }
  if (options.height) {
    height = parseInt(options.height);
  }
  if (options.quality) {
    quality = parseInt(options.quality);
    console.log('Quality set to: ' + quality);
  }

  console.log(req.headers.accept);
  if (('false' !== options.auto_webp) && req.headers.accept.indexOf('webp')) {
    format = 'webp';
    console.log('transform to format: webp');
  } else if (options.format) {
    format = options.format;
    console.log('transform to format: ' + format);
  }
  
  transform = transform.toFormat(format, {quality: quality});

  if (width || height) {
    transform = transform.resize(width, height);
  }

  transmutation = {
    format: format,
    imageReadStream: streamifier.createReadStream(image).pipe(transform)
  };

  return transmutation;
};
