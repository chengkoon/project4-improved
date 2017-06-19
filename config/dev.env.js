var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOMAIN: '"http://localhost:3000/"',
  CLOUDINARY_URL: '"https://api.cloudinary.com/v1_1/drkrmbkx3/upload"',
  CLOUDINARY_UPLOAD_PRESET: '"or3ymdvj"'
})
