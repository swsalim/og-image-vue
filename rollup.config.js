import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss'
import vue from 'rollup-plugin-vue'

export default {
  input: 'index.js',
  output: [
    {
      file: `image.js`,
      format: 'iife',
    },
  ],
  plugins: [
    peerDepsExternal(),
    babel(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    alias({
      'vue': require.resolve('vue/dist/vue.esm.js')
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    scss(),
    vue({ compileTemplate: true })
  ]
}