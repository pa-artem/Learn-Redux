/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

/**
 * @type {('development' | 'production')}
 */
let mode = 'development';

const optimization = {};

const publicPath = process.env.ROUTER_BASE ? `/${process.env.ROUTER_BASE}/` : '/';

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    baseUrl: publicPath,
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
  new webpack.EnvironmentPlugin({
    PUBLIC_URL: process.env.PUBLIC_URL ?? '',
    ROUTER_BASE: process.env.ROUTER_BASE ?? '',
  }),
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';

  plugins.push(
    new ESLintPlugin({
      context: './src',
      extensions: ['.js', '.jsx', '.ts', 'tsx'],
    }),
    new CompressionPlugin(),
  );
}

if (process.env.SERVE) {
  plugins.push(new ReactRefreshPlugin());
}

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  mode,
  plugins,
  optimization,
  entry: './src/index.tsx',
  devtool: mode === 'production' ? undefined : 'source-map',

  output: {
    publicPath,
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  devServer: {
    static: './dist',
    hot: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.(png|jpe?g|svg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};
