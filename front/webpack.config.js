const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => ({
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].min.js',
    publicPath: '/',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coin.',
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',],
          },
        },
      },
      {
        test: /\.scss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(?:|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `./fonts/[name].[ext]`,
            }
          }
        ]
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
