// @ts-ignore
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWebpackVersion = void 0;

const path = require('path');

const readPkgUp = require('read-pkg-up');

const getWebpackVersion = () => {
  const webpackPath = require.resolve('webpack');

  const {
    dir
  } = path.parse(webpackPath);
  const webpackPackageJson = readPkgUp.sync({
    cwd: dir,
    normalize: false
  });
  const version = webpackPackageJson.package.version ? webpackPackageJson.package.version : null;
  return version;
};

exports.getWebpackVersion = getWebpackVersion;