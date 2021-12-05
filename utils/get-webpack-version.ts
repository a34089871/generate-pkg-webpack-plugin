import path from 'path'
import readPkgUp from 'read-pkg-up';

export const getWebpackVersion = () => {
    const webpackPath = require.resolve('webpack');
    const { dir } = path.parse(webpackPath);

    const webpackPackageJson: any = readPkgUp.sync({ cwd: dir, normalize: false });
    const version: string = webpackPackageJson.package.version
        ? webpackPackageJson.package.version
        : null;

    return version;
}


