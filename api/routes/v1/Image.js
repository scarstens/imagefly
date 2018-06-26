const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const url = require('url');
const path = require('path');
const transmute = require('../../../app/Transmute');
const RemoteRequest = require('../../../app/RemoteRequest');

router.get('/:config_set/:options/:location(*)', async (req, res, next) => {
    console.log('Start image route.')
    // Parse the options like a querytring seperated by commas
    const options = querystring.parse( req.params.options, ',' );

    // Set the custom header to match the config_set for cache performance options
    res.header('X-API-CONFIG', req.params.config_set);

    // Extract the image format
    image_path = url.parse(req.params.location).path;
    path_data = path.parse(image_path);
    extension_type = path_data.ext;
    options.format = options.format || extension_type.slice(1);

    // Pass file object for content disposition changes
    options.file_data = path_data;

    location = req.params.location;
    query_string = querystring.stringify(req.query);

    if(query_string){
        location += '?' +querystring.stringify(req.query);
    }

    let remoteRequest = new RemoteRequest();
    try {
        let imageStream = await remoteRequest.getImageStream(location);
        console.log(typeof(imageStream));
        console.log(remoteRequest.statusCode);
        if(imageStream){
            // console.log(imageStream);
            imageStream.pipe(res);
        } else {
            console.error('Image stream failed.');
        }
        
    } catch (err) {
        console.log(err);
        exit;
    }
    console.log('End of image route.')
    return res;
});

module.exports = router;
