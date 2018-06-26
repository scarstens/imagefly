const express = require('express');
const router = express.Router();
const transmute = require('../../app/transmute');
const querystring = require('querystring');
const url = require('url');
const path = require('path');

router.get('/:config_set/:options/:location(*)', (req, res, next) => {
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

    console.log('Begin Transmute...');
    location = req.params.location;
    query_string = querystring.stringify(req.query);
    if(query_string){
        location += '?' +querystring.stringify(req.query);
    }
    let transmutation = transmute(req, res, next, location, options);
    // Todo: create promise so status is valid
    console.log('status: ' + transmutation.remote_status_code);
    try {
        transmutation.imageReadStream.pipe(res);
    } catch (err) {
        console.log(err);
    }
    console.log('Transmute finished.')
});

module.exports = router;
