const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'js/[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  target: 'web',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[folder]/[name].[ext]',
              outputPath: './images/',
              useRelativePath: true,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
    modules: ['src', 'node_modules'], // Assuming that your files are inside the src dir
  },
  devServer: {
    hot: false, // optional, but you must not set both hot and liveReload to true
    liveReload: true,
  },
  optimization: {
    nodeEnv: 'production',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors', // part of the bundle name and
          // can be used in chunks array of HtmlWebpackPlugin
          test: /[\\/](node_modules|vendors)[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.min.css',
      chunkFilename: '[id].css',
    }),

    new HtmlWebpackPlugin({
      title: 'Interactive Comments Section',
      template: 'src/index.html',
    }),
    new ESLintPlugin({
      quiet: true,
      failOnError: true,
    }),
  ],
};
