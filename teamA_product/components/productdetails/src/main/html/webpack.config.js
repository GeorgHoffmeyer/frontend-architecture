const path = require('path');

module.exports = {
  entry: './src/productdetails.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'productdetails.js',
    path: path.resolve(__dirname, '../../../build/dist')
  }
};