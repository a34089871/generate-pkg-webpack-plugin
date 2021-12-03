"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd(); // import {getWebpackVersion} from "./src/utils/get-webpack-version";

class GeneratePkgJsonPlugin {
  // private version: string = getWebpackVersion();
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // 可以从编译器对象访问 webpack 模块实例
    // 并且可以保证 webpack 版本正确
    const {
      webpack
    } = compiler; // console.log(this.version);

    const str = this.handlePkgJson();
    /** compiler.hooks.<hoonkName>.tap/tapAsync/tapPromise */

    compiler.hooks.compilation.tap("GeneratePkgJsonPlugin", compilation => {
      // webpack5
      if (webpack) {
        // 获取 Compilation 后续会用到 Compilation 提供的 stage
        const {
          Compilation
        } = webpack;
        const {
          RawSource
        } = webpack.sources; // webpack4静态资源生成方法

        compilation.emitAsset(`${this.options.ouputFile || "package"}.json`, new RawSource(str)); // webpack4
      } else {
        // webpakc5静态资源生成方法
        compilation.assets[`${this.options.ouputFile || "package"}.json`] = {
          source: function () {
            return str;
          },
          size: function () {
            return 19;
          }
        };
      }
    });
  }

  handlePkgJson() {
    const date = new Date().toLocaleString();

    const pkgjson = _fs.default.readFileSync(`${cwd}\\package.json`, "utf-8");

    const data = JSON.parse(pkgjson);
    data.buildTime = date;
    return JSON.stringify(data, null, 2);
  }

}

module.exports = GeneratePkgJsonPlugin;