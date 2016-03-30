import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { APP } from 'config/paths'
import { isomorphicPlugin } from 'server/isomorphicTools'
import autoprefixer from 'autoprefixer'
import OfflinePlugin from 'offline-plugin'
import cssnano from 'cssnano'

export default {
  ...webpackConfig,
  entry: {
    ...webpackConfig.entry,
    head: [
      ...webpackConfig.entry.head,
      `${APP}/utils/ga.js`,
    ],
  },
  devtool: null,
  plugins: [
    isomorphicPlugin,
    ...webpackConfig.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new OfflinePlugin({
      caches: {
        main: [
          '/',
          ':rest:',
        ],
        additional: [
          '/post/*',
        ],
      },
      externals: [ '/', '/post/*' ],
      scope: '/',
      updateStrategy: 'all',
      version: 'v1',
      ServiceWorker: {
        output: 'sw.js',
      },
      AppCache: {
        directory: 'appcache/',
      },
    }),
  ],
  postcss: [
    autoprefixer({ browsers: [ 'last 2 versions' ] }),
    cssnano(),
  ],
  module: {
    loaders: [ {
      test: /module\.s?css$/,
      include: [ /src\/app/, /src\/styles/ ],
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&localIdentName=[path][name]-[local]' +
        '!postcss' +
        '!sass?outputStyle=compressed'
      ),
    }, {
      test: /\.s?css$/,
      include: [ /src\/app/, /src\/styles/ ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract(
        'style', 'css!postcss!sass?outputStyle=compressed'
      ),
    }, {
      ...babelLoaderConfig,
      query: {
        ...babelLoaderConfig.query,
        'plugins': [
          ...babelLoaderConfig.query.plugins,
          'transform-flow-strip-types',
        ],
      },
    }, ...webpackConfig.module.loaders ],
  },
}
