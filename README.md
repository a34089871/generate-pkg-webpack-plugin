<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# generate-pkg-webpack-plugin

打包后在输出目录生成包描述文件，并记录打包时间

## Getting Started

To begin, you'll need to install `generate-pkg-webpack-plugin`:

```console
$ npm install generate-pkg-webpack-plugin --save-dev
```

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```js
const GeneratePkgPlugin = require("generate-pkg-webpack-plugin");

module.exports = {
  plugins: [new GeneratePkgPlugin()],
};
```

## Options

|                        Name                         |                   Type                    |                            Default                            | Description                                                                                                   |
| :-------------------------------------------------: | :---------------------------------------: | :-----------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------ |
|                 **[`filename`]**                 | `{String}` |                          `package`                          | 生成文件名称

### `filename`

Type: `String`
Default: `package`

**webpack.config.js**

```js
module.exports = {
  plugins: [
    new GeneratePkgPlugin({
      filename: 'description'
    }),
  ],
};
```
