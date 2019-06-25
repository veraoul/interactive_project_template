/* eslint no-console:0, max-len:0 */
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WeinreWebpackPlugin = require('weinre-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBar = require('webpackbar');
const { cwd, toFilename } = require('./util');
const base = require('./webpack.base');

const DEV_MODE = process.env.NODE_ENV === 'development';
const WEINRE_MODE = DEV_MODE && process.env.WEINRE;
const config = require('../../src/config');


const webpackConfig = merge(base, {
  /*
  ########  ##       ##     ##  ######   #### ##    ##  ######
  ##     ## ##       ##     ## ##    ##   ##  ###   ## ##    ##
  ##     ## ##       ##     ## ##         ##  ####  ## ##
  ########  ##       ##     ## ##   ####  ##  ## ## ##  ######
  ##        ##       ##     ## ##    ##   ##  ##  ####       ##
  ##        ##       ##     ## ##    ##   ##  ##   ### ##    ##
  ##        ########  #######   ######   #### ##    ##  ######
  */
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // template: `!!html-loader!pug-html-loader?${pugData}!src/html/index.pug`,
      template: 'html/index.pug',
      filename: 'index.html',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new CopyWebpackPlugin([
      { from: 'asset/copy', to: './asset', ignore: ['.*'] },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ENV: JSON.stringify('client'),
        APP_ENV: JSON.stringify(process.env.APP_ENV),
        ...Object.keys(config).reduce((o, key) => {
          const value = config[key];
          o[key] = ['boolean', 'number'].indexOf(typeof value) !== -1
            ? value
            : JSON.stringify(value);
          return o;
        }, {}),
      },
    }),
    new WebpackBar(),
    ...DEV_MODE
      ? [
        new FriendlyErrorsPlugin(),
      ]
      : [
        new CleanWebpackPlugin(['dist'], {
          root: cwd(),
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
  ],

  /*
    ########  ######## ##     ##  ######  ######## ########  ##     ## ######## ########
    ##     ## ##       ##     ## ##    ## ##       ##     ## ##     ## ##       ##     ##
    ##     ## ##       ##     ## ##       ##       ##     ## ##     ## ##       ##     ##
    ##     ## ######   ##     ##  ######  ######   ########  ##     ## ######   ########
    ##     ## ##        ##   ##        ## ##       ##   ##    ##   ##  ##       ##   ##
    ##     ## ##         ## ##   ##    ## ##       ##    ##    ## ##   ##       ##    ##
    ########  ########    ###     ######  ######## ##     ##    ###    ######## ##     ##
  */
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 3000,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      chunks: false,
      chunkModules: false,
      children: false,
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    /*  proxy: [
      {
        context: ['/upload', '/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    ], */
  },
  /*
   #######  ########  ######## #### ##     ## #### ########    ###    ######## ####  #######  ##    ##
  ##     ## ##     ##    ##     ##  ###   ###  ##       ##    ## ##      ##     ##  ##     ## ###   ##
  ##     ## ##     ##    ##     ##  #### ####  ##      ##    ##   ##     ##     ##  ##     ## ####  ##
  ##     ## ########     ##     ##  ## ### ##  ##     ##    ##     ##    ##     ##  ##     ## ## ## ##
  ##     ## ##           ##     ##  ##     ##  ##    ##     #########    ##     ##  ##     ## ##  ####
  ##     ## ##           ##     ##  ##     ##  ##   ##      ##     ##    ##     ##  ##     ## ##   ###
   #######  ##           ##    #### ##     ## #### ######## ##     ##    ##    ####  #######  ##    ##
  */
  /* optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /([\\/]node_modules[\\/]|[\\/]src[\\/]lib[\\/])/,
          priority: -10,
        },
      },
    },
  }, */
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 100,
      minChunks: 1,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendors: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true,
        },
      },
    },
  },
});

/*
const externalsGSAP = `{
  TweenMax: TweenMax,
  TimelineMax: TimelineMax,
  Power0: Power0,
  Power1: Power1,
  Power2: Power2,
  Power3: Power3,
  Power4: Power4
}`;
webpackConfig.externals = [
  {
    jquery: 'jQuery',
    scrollmagic: 'ScrollMagic',
  },
  (context, request, callback) =>
    ((/^gsap$/.test(request)) ? callback(null, externalsGSAP) : callback()),
];
*/
/*
######   #######  ##    ## ########  #### ######## ####  #######  ##    ##    ###    ##        ######
##    ## ##     ## ###   ## ##     ##  ##     ##     ##  ##     ## ###   ##   ## ##   ##       ##    ##
##       ##     ## ####  ## ##     ##  ##     ##     ##  ##     ## ####  ##  ##   ##  ##       ##
##       ##     ## ## ## ## ##     ##  ##     ##     ##  ##     ## ## ## ## ##     ## ##        ######
##       ##     ## ##  #### ##     ##  ##     ##     ##  ##     ## ##  #### ######### ##             ##
##    ## ##     ## ##   ### ##     ##  ##     ##     ##  ##     ## ##   ### ##     ## ##       ##    ##
 ######   #######  ##    ## ########  ####    ##    ####  #######  ##    ## ##     ## ########  ######
*/
if (WEINRE_MODE) {
  webpackConfig.plugins.push(new WeinreWebpackPlugin({
    httpPort: 8000,
    boundHost: '0.0.0.0',
    verbose: false,
    debug: false,
    readTimeout: 5,
  }));
}
if (process.env.SSR) {
  webpackConfig.plugins.push(new VueSSRClientPlugin());
}

if (!DEV_MODE) {
  const stylusLoader = webpackConfig.module.rules.find(({ test }) => test.test('.stylus'));
  // Replace the `vue-style-loader` with
  // the MiniCssExtractPlugin loader.
  stylusLoader.use[0] = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../../',
    },
  };
  webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: toFilename('asset/css/[name]', 'css'),
    chunkFilename: toFilename('asset/css/[name]-chunk', 'css'),
  }));
}
module.exports = webpackConfig;
