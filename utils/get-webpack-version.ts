import path from 'path'
const readPkgUp = require('read-pkg-up');

export const getWebpackVersion = () => {
    const webpackPath = require.resolve('webpack');
    const { dir } = path.parse(webpackPath);

    const webpackPackageJson: any = readPkgUp.sync({ cwd: dir, normalize: false });
    const version: string = webpackPackageJson.package.version
        ? webpackPackageJson.package.version
        : null;

    return version;
}


