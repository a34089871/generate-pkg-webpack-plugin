const GeneratePkgJsonPlugin = require('../index.js')
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