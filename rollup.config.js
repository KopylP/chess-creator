import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  entry: './public/js/src/App.js',
  dest: './public/js/dist/App.js',
  plugins: [
    babel(babelrc())
  ]
};