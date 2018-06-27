const request = require('request');

module.exports = class RemoteRequest {
  constructor (key, secret) {
    this.statusCode = 0
    this.request = request.defaults({})
  }

  async getImageStream (image_url) {
    console.log('start getImageStream')
    console.log(image_url)
    const options = {
      uri: image_url,
      encoding: 'binary'
    }

    try {
      this.response = await new Promise(function (resolve, reject) {
        request.get(options, function (err, response) {
          resolve(response)
        })
      })

      this.statusCode = this.response.statusCode
    } catch (error) {
      console.log(error)
    }

    return this.response
  }
}
