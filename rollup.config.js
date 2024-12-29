import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs', // CommonJS 输出
      exports: 'default',
    },
    plugins: [nodeResolve(), commonjs(), terser()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm', // ESM 输出
    },
    plugins: [nodeResolve(), commonjs(), terser()],
  },
];