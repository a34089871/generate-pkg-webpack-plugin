import fs  from 'fs'
const cwd = process.cwd()
import {getWebpackVersion} from "./get-webpack-version";

import { Compilation, Compiler, Stats } from 'webpack';
export interface Options {
  ouputFile?: string;
}

class GeneratePkgJsonPlugin {
  private version: string = getWebpackVersion();
  private options: Options;
  constructor(options: Options = {}) {
    this.options = options;
  }

  apply(compiler: any) {
    // 可以从编译器对象访问 webpack 模块实例
    // 并且可以保证 webpack 版本正确
    const { webpack } = compiler;
    console.log(this.version);
    // console.log(getWebpackVersion());
    const str = this.handlePkgJson();

    /** compiler.hooks.<hoonkName>.tap/tapAsync/tapPromise */
    compiler.hooks.compilation.tap(
      "GeneratePkgJsonPlugin",
      (compilation: Compilation) => {
        // webpack5
        if (webpack) {
          // 获取 Compilation 后续会用到 Compilation 提供的 stage
          const { Compilation } = webpack;
          const { RawSource } = webpack.sources;

          // webpack4静态资源生成方法
          compilation.emitAsset(
            `${this.options.ouputFile || "package"}.json`,
            new RawSource(str)
          );

          // webpack4
        } else {
          // webpack5静态资源生成方法
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