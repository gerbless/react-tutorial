const fs = require('fs');
const execSync = require('child_process').execSync;

const jsonContents = `
{
  "name": "react-tutorial",
  "description": "React tutorial boilerplate",
  "scripts": {
    "start": "webpack-dev-server --progress --colors"
  },
  "dependencies": {
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "redux": "^3.7.2",
    "redux-thunk": "^2.2.0"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "node-sass": "^4.7.2",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.19.0",
    "webpack": "^2.0.0",
    "webpack-dev-server": "^2.9.5"
  }
}
`;

const webpackConfig = `
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
          test: /\.scss$/,
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
`;

const indexHTML = `
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" contents="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <title>React example</title>
  <script src="main.bundle.js" defer></script>
</head>
<body>
  <section id="app"></section>
</body>
</html>
`;

console.log('creating src folder');
fs.mkdirSync('src', 0744);
console.log('creating package.json');
fs.writeFileSync('./package.json', jsonContents);
console.log('creating webpack config');
fs.writeFileSync('./webpack.config.js', webpackConfig);
console.log('creating initial javascript file');
fs.writeFileSync('./src/main.jsx', "console.log('hello world');");
console.log('creating initial HTML file');
fs.writeFileSync('./index.html', indexHTML);

console.log('installing dependencies');
execSync('npm install --no-optional');
