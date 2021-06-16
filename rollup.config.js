import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
// import globals from 'rollup-plugin-node-globals'
import scss from 'rollup-plugin-scss'
import vue from 'rollup-plugin-vue'

export default {
  input: 'index.js',
  output: [
    {
      name: 'image',
      file: `image.js`,
      format: 'iife',
      globals: {
        vue: 'Vue'
      },
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
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),
    scss(),
    vue({ compileTemplate: true }),
    // globals()
  ]
}