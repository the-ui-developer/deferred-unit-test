const path = require('path')
module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, 'src', 'index')],
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
