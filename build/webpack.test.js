const GeneratePkgPlugin = require('../libs/generate-pkg-webpack-plugin')
const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, '../test/index.js'),
  output: {
    filename: 'main.js'
  },
  plugins: [
    new GeneratePkgJsonPlugin({
      ouputFile: '111'
    }
  )]
}