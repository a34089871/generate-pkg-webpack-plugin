import fs  from 'fs'
import os from 'os'
import path from 'path'
const cwd = process.cwd()
// import {getWebpackVersion} from "./get-webpack-version";
import { Compilation, Compiler, Stats } from 'webpack';

import { buildTime, commitInfo } from "./get-info";
export interface Options {
  filename?: string;
}

class GeneratePkgJsonPlugin {
  // private version: number = parseInt(getWebpackVersion());
  private options: Options;

  constructor(options: Options = { filename: "package" }) {
    this.options = options;
  }

  apply(compiler: any) {
    // 可以从编译器对象访问 webpcommitInfoack 模块实例
    // 并且可以保证 webpack 版本正确
    const { webpack } = compiler;
    const str = this.handlePkgJson();

    if (!str) return;

    /** compiler.hooks.<hoonkName>.tap/tapAsync/tapPromise */
    compiler.hooks.compilation.tap(
      "GeneratePkgJsonPlugin",
      (compilation: Compilation) => {
        const filename: string = `${this.options.filename}.json`;
        if (!this.options.filename) throw new Error(
          "[generate-pkg-webpack-plugin] filename不能为空字符串"
        );
        // webpack5
        if (webpack) {
          // 获取 Compilation 后续会用到 Compilation 提供的 stage
          const { Compilation } = webpack;
          const { RawSource } = webpack.sources;

          compilation.emitAsset(filename, new RawSource(str));

          // webpack4
        } else {
          (compilation as any).assets[filename] = {
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

  private handlePkgJson() {
    const rootPath: string = path.join(cwd, "package.json");

    try {
      const pkgjson: string = fs.readFileSync(rootPath, "utf-8");
      const data = JSON.parse(pkgjson);
      data.buildTime = buildTime;
      data.commitInfo = JSON.stringify(commitInfo);

      return JSON.stringify(data, null, 2);
    } catch (e) {
      throw new Error(
        "[generate-pkg-webpack-plugin] 无法获取根目录下package.json"
      );
    }
  }
}

module.exports = GeneratePkgJsonPlugin