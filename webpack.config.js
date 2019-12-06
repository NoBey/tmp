const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.js(.*)$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      options: {
        presets: ['latest', 'stage-0', 'react']
      }
    },{
      test: /\.css$/i,
      use:['style-loader', 'css-loader']
    },]
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    compress: true,
    port: 9000,
  }
}