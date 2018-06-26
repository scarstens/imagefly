# ImageFly
ImageFly is an REST based image service that provides  transmutations of *remote* images on the fly. (Yes, images from any remote URL. See examples.) This uses the node module called sharp, because of its performance. See http://sharp.pixelplumbing.com/en/stable/performance/. 

## Installation

Note: it runs on port 3000 by default. 

```
export PORT=3300; npm build && npm start
```

## Examples
~⚠️Assumes default port of 3300⚠️~
Resize based on width, set auto-webp (auto detect based on browser), and quality down to 80.
http://localhost:3300/image/default_config/width=300,auto_webp=true,quality=100/https://upload.wikimedia.org/wikipedia/commons/1/16/Mimus_polyglottos1.jpg

## Options

- width
- height
- format
- auto_webp
- quality

## Uses

- Sharp
- Express
- Morgan
- Request

# TODO

##Issues

Not Working:
http://localhost:3300/image/scarstens/width=300/https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_C%C3%A9sars_2014.jpg

## Features needed

- cropping
- poi
- gravity
- rotation
- flip
- flop
- tint
- mocha tests
- remove tutorial files
- linting
- circleCI github integration
- packagist created
- dockerfile
- validate formats allowed
- enable config_sets to be configured
- watermark (compositing images)