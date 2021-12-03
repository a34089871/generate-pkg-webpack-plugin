// @ts-ignore

'use strict';

const path = require('path');
const readPkgUp = require('read-pkg-up');

export const getWebpackVersion = () => {
    const webpackPath = require.resolve('webpack');
    const { dir } = path.parse(webpackPath);

    const webpackPackageJson = readPkgUp.sync({ cwd: dir, normalize: false });
    console.log(webpackPackageJson)
    const version = webpackPackageJson.package.version
        ? webpackPackageJson.package.version
        : null;

    return version;
}


