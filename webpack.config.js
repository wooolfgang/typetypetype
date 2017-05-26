const path = require('path');

module.exports = {
  entry: {
    core: ['./src/frontend/index.jsx']
  },

  output: {
    path: path.join(process.cwd(), '/public/js/'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude:
      /node_modules/
    }]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  }
}