const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const robotstxtOptions = {
  policy: [{
    userAgent: '*',
    disallow: '/'
  }]
};

const config = {
  context: path.join(__dirname, '..'),

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'react-hot-loader/patch',
    './index.jsx',
  ],

  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|tiff)$/i,
        loader: 'file-loader?name=public/icons/[name].[ext]',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [/images/], // Prevent font loader from overwriting svg files in the images folder.
        use: ['file-loader'],
      },
      {
        test: /locales/,
        use: ['i18next-resource-store-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
    modules: [path.join(__dirname, '..'), 'node_modules'],
    alias: {
      root: path.join(__dirname, '..'),
      presentationals: path.join(__dirname, '..', 'app', 'presentationals'),
      pages: path.join(__dirname, '..', 'app', 'pages'),
      constants: path.join(__dirname, '..', 'app', 'constants'),
      selectors: path.join(__dirname, '..', 'app', 'selectors'),
      reducers: path.join(__dirname, '..', 'app', 'reducers'),
      actions: path.join(__dirname, '..', 'app', 'actions'),
      containers: path.join(__dirname, '..', 'app', 'containers'),
      helpers: path.join(__dirname, '..', 'app', 'helpers'),
      sagas: path.join(__dirname, '..', 'app', 'sagas'),
      errors: path.join(__dirname, '..', 'app', 'errors'),
      api: path.join(__dirname, '..', 'app', 'api'),
      lib: path.join(__dirname, '..', 'lib'),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StatsPlugin('manifest.json', {
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true,
    }),
    new RobotstxtPlugin(robotstxtOptions),
    //new StyleLintPlugin()
  ],

  devServer: {
    hot: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
};

if (process.env.NODE_ENV !== 'production' && fs.existsSync('config/config.js')) {
  config.plugins.push(new CopyWebpackPlugin([
    { from: 'config/config.js', to: 'config.js' }
  ]))
}

module.exports = config;
