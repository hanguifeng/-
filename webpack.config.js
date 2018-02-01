const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ["", "js", "jsx", "es6", "css", "scss", "png", "jpg", "jpeg"],
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'views': path.resolve(__dirname, 'src/views'),
      'src': path.resolve(__dirname, 'src'),
      'styles': path.resolve(__dirname, 'src/styles'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', "stage-0"],
          plugins: [["import", { libraryName: "antd", style: "css"}]]
        }
      }
    ],
  }
};
