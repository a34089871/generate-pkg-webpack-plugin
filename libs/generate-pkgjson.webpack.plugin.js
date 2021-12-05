'use strict';

var fs = require('fs');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

const readPkgUp = require('read-pkg-up');
const getWebpackVersion = () => {
    const webpackPath = require.resolve('webpack');
    const { dir } = path__default["default"].parse(webpackPath);
    const webpackPackageJson = readPkgUp.sync({ cwd: dir, normalize: false });
    const version = webpackPackageJson.package.version
        ? webpackPackageJson.package.version
        : null;
    return version;
};

const cwd = process.cwd();
class GeneratePkgJsonPlugin {
    version = parseInt(getWebpackVersion());
    options;
    constructor(options = {}) {
        this.options = options;
    }
    apply(compiler) {
        // 可以从编译器对象访问 webpack 模块实例
        // 并且可以保证 webpack 版本正确
        const { webpack } = compiler;
        const str = this.handlePkgJson();
        /** compiler.hooks.<hoonkName>.tap/tapAsync/tapPromise */
        compiler.hooks.compilation.tap("GeneratePkgJsonPlugin", (compilation) => {
            console.log(this.version > 4);
            switch (this.version) {
                // webpack4
                case 4:
                    // webpack4静态资源生成方法
                    compilation.assets[`${this.options.ouputFile || "package"}.json`] = {
                        source: function () {
                            return str;
                        },
                        size: function () {
                            return 19;
                        },
                    };
                    break;
                // webpack5
                case 5:
                    const { RawSource } = webpack.sources;
                    // webpack5静态资源生成方法
                    compilation.emitAsset(`${this.options.ouputFile || "package"}.json`, new RawSource(str));
                    break;
                default:
                    console.error('暂不支持此版本webpack，请使用webpack4/5！');
            }
        });
    }
    handlePkgJson() {
        const date = new Date().toLocaleString();
        const pkgjson = fs__default["default"].readFileSync(`${cwd}\\package.json`, "utf-8");
        const data = JSON.parse(pkgjson);
        data.buildTime = date;
        return JSON.stringify(data, null, 2);
    }
}
module.exports = GeneratePkgJsonPlugin;
