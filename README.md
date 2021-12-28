<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# generate-pkg-webpack-plugin

打包后在输出目录生成包描述文件，并记录打包时间

## Getting Started

To begin, you'll need to install `generate-pkg-webpack-plugin`:

```console
$ npm install generate-pkg-webpack-plugin --save-dev
```

在生产环境下引入`generate-pkg-webpack-plugin`

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
|                 **[`filename`]**                 | `{String}` |                          `package`                          | 生成文件名称(预留配置，不建议修改)

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
