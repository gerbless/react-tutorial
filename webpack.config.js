
const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
  return {
    devtool: 'inline-source-map',
    entry: {
      main: path.resolve(__dirname, 'src', 'main.jsx')
    },
    output: {
      path: path.join(__dirname, 'dist', 'js'),
      filename: '[name].bundle.js'
    },
    devServer: {
      contentBase: [
        path.resolve(__dirname),
        path.resolve(__dirname, 'dist')
      ],
      port: 1337,
      index: 'index.html',
      open: true
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['env', {modules: false}], 'react']
              }
            }
          ]
        },
        {
          test: /.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              query: {
                modules: false
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      enforceExtension: false,
      enforceModuleExtension: false
    }
  };
};
