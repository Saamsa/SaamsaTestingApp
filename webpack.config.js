const path = require('path');

module.exports = {
  entry: {
    app: './dist/eventStreamer.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    },
    proxy: { '/': 'http://localhost:3000' },
    compress: true,
    port: 8080,
  },
  module: {},
};
