// rollup.config.js
import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2'
import path from 'path'

export default {
    input: 'index.ts',
    output: {
      file: './libs/generate-pkgjson.webpack.plugin.js',
      format: 'cjs'
    },
    plugins: [
        nodeResolve({
            extensions:['.js', '.ts']
        }),
        babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
        }),
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
    ]
  };