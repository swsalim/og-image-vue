import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue'

const config = {
  input: 'index.js',
  output: [
    {
      file: `image.js`,
      format: 'iife',
    },
  ],
  plugins: [
    babel(),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    vue({ compileTemplate: true })
  ]
}