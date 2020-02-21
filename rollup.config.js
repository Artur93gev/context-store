import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: {
    index: './index.js',
  },
  output: [
    {
      dir: 'build',
      format: 'esm',
      entryFileNames: '[name].js',
      exports: 'named',
    },
  ],
  external: ['react'],
  plugins: [
    external(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-syntax-jsx',
      ],
    }),
    commonjs({
      namedExports: {
        'react': ['useContext'],
      }
    }),
    resolve(),
  ],
};
