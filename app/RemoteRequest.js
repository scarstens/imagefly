const requestnative = require('request-promise-native');
const request = require('request');

module.exports = class RemoteRequest {
    constructor(key, secret) {
        this.statusCode = 0;
        this.request = request.defaults({});
        this.requestnative = requestnative.defaults({});
    }

    async getImageStream(image_url) {
        console.log('start getImageStream');
        console.log(image_url);
        const options = {
            uri: image_url
        };
        
        let remote_response = await this.requestnative.get(options, (error, response, body) => {
            console.log('request.get callback function running...');
            this.statusCode = response.statusCode;
            if (response.statusCode == 200) {
                console.log('Remote image found, and downloaded.');
            } else {
                console.error('Remote image not found, or other request error.');
            }
            return this;
        });
        console.log('end getImageStream returning response');
        // return this.request.get(options);
        return remote_response;
    }
};
