const GeneratePkgJsonPlugin = require('../libs/index')
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