const path = require('path');

module.exports = {
  entry: './src/cartOverview.ts',
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
    filename: 'cartOverview.js',
    path: path.resolve(__dirname, '../../../build/dist')
  }
};