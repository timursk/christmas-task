const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, './dist'),
        // directory: path.resolve(__dirname, './dist'),
      },
      open: true,
      compress: true,
      hot: true,
  },
};
