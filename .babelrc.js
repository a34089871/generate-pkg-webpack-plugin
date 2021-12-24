'use strict';

const nodeVersion = require('./utils/node-version');
console.log(nodeVersion)
const babel = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: nodeVersion,
                },
            },
        ],
        '@babel/preset-typescript',
    ],
};

module.exports = babel;
