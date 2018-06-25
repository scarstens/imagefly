const express = require('express');
const router = express.Router();
const transmute = require('../../app/transmute');
const request = require('request');

router.get('/:account/:options/:location', (req, res, next) => {
    const account = req.params.account;
    const options = req.params.options;
    const location = req.params.location;
    res.header('X-API-ACCOUNT', account);
    // res.status(200).sendFile('./adorable-animal-canine-1097209.jpg', { root: req.appDir });
    const url = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Trinidad_and_Tobago_hummingbirds_composite.jpg";
    res.type('image/jpg');
    console.log('Begin Transmute...');
    // transmute(req.appDir+'/adorable-animal-canine-1097209.jpg').pipe(res);
    transmute(url).pipe(res);
    console.log('Transmute finished.')
});
// TODO: request('http://fromrussiawithlove.com/baby.mp3').pipe(fs.createWriteStream('song.mp3'))

router.get('/opt/:location', (req, res, next) => {
    // var url = sourceUrl + req.params.fileName;
    var url = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Trinidad_and_Tobago_hummingbirds_composite.jpg';
	request.get(url).pipe(res);
});

module.exports = router;
