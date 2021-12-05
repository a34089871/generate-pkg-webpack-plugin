import fs  from 'fs'
const cwd = process.cwd()
import { getWebpackVersion } from "./utils/get-webpack-version";

import { Compilation } from 'webpack';
import { Options } from './interface/index'

class GeneratePkgJsonPlugin {
  private version: number = parseInt(getWebpackVersion());
  private options: Options;
  constructor(options: Options = {}) {
    this.options = options;
  }

  apply(compiler: any) {
    // 可以从编译器对象访问 webpack 模块实例
    // 并且可以保证 webpack 版本正确
    const { webpack } = compiler;
    const str = this.handlePkgJson();
    
    /** compiler.hooks.<hoonkName>.tap/tapAsync/tapPromise */
    compiler.hooks.compilation.tap(
      "GeneratePkgJsonPlugin",
      (compilation: Compilation) => {
        console.log(this.version > 4)
        switch(this.version) {
          // webpack4
          case 4: 
            // webpack4静态资源生成方法
            (compilation as any).assets[
              `${this.options.ouputFile || "package"}.json`
            ] = {
              source: function () {
                return str;
              },
              size: function () {
                return 19;
              },
            };
          break

          // webpack5
          case 5: 
            // 获取 Compilation 后续会用到 Compilation 提供的 stage
            const { Compilation } = webpack;
            const { RawSource } = webpack.sources;

            // webpack5静态资源生成方法
            compilation.emitAsset(
              `${this.options.ouputFile || "package"}.json`,
              new RawSource(str)
            );
          break

          default: 
            console.error('暂不支持此版本webpack，请使用webpack4/5！')
        }
      }
    );
  }

  handlePkgJson() {
    const date = new Date().toLocaleString();
    const pkgjson = fs.readFileSync(`${cwd}\\package.json`, "utf-8");
    const data = JSON.parse(pkgjson);
    data.buildTime = date;

    return JSON.stringify(data, null, 2);
  }
}

module.exports = GeneratePkgJsonPlugin