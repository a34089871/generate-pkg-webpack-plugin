const GeneratePkgJsonPlugin = require('../libs/generate-pkgjson.webpack.plugin')
module.exports = {
  output: {
    filename: 'main.js'
  },
  plugins: [
    new GeneratePkgJsonPlugin({
      ouputFile: '111'
    }
  )]
}