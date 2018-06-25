const fs = require('fs');
const request = require('request');

module.exports = function transmute(path, format, width, height) {
    console.log('Path: ' + path)
    if( path.indexOf('http') > -1 ) {
        console.log('URL Found.');
        const readStream = request.get(path);
    } else {
        console.log('File Found.');
        const readStream = request.get('file://'+path);
    }

    return readStream;
}
