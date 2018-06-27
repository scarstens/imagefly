const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const url = require('url');
const path = require('path');
const RemoteRequest = require('../../../app/RemoteRequest');
const Transmute = require('../../../app/Transmute');

router.get('/:config_set/:options/:location(*)', async (req, res, next) => {
  console.log('Start image route.');
  // Parse the options like a querytring seperated by commas
  const options = querystring.parse(req.params.options, ',');

  // Set the custom header to match the config_set for cache performance options
  res.header('X-API-CONFIG', req.params.config_set);

  // Extract the image format
  let image_path = url.parse(req.params.location).path;
  let path_data = path.parse(image_path);
  let extension_type = path_data.ext;
  options.format = options.format || extension_type.slice(1);

  // Pass file object for content disposition changes
  options.file_data = path_data;

  let location = req.params.location;
  let query_string = querystring.stringify(req.query);

  if (query_string) {
    location += '?' + querystring.stringify(req.query);
  }

  let remoteRequest = new RemoteRequest();

  try {
    let remote_request = await remoteRequest.getImageStream(location);
    if (remoteRequest.statusCode == 200) {
      if('origin' === options.source){
        res.send(new Buffer(remote_request.body, 'binary'));
      } else {
        let transmutation = Transmute(req, new Buffer(remote_request.body, 'binary'), options);
        res.type('image/' + transmutation.format);
        res.header('Content-disposition', 'inline; filename=' +
          options.file_data.name + '.' + transmutation.format);
        transmutation.imageReadStream.pipe(res);
      }
    } else {
      console.error('Image stream failed.');
      next();
    }

  } catch (err) {
    console.log(err);
    exit;
  }
  console.log('End of image route.');
  return res;
});

module.exports = router;
