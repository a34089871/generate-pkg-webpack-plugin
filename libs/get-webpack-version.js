"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWebpackVersion = void 0;

var _path = _interopRequireDefault(require("path"));

var _readPkgUp = _interopRequireDefault(require("read-pkg-up"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getWebpackVersion = () => {
  const webpackPath = require.resolve('webpack');

  const {
    dir
  } = _path.default.parse(webpackPath);

  const webpackPackageJson = _readPkgUp.default.sync({
    cwd: dir,
    normalize: false
  });

  const version = webpackPackageJson.package.version ? webpackPackageJson.package.version : null;
  return version;
};

exports.getWebpackVersion = getWebpackVersion;