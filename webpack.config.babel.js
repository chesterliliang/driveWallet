import path from 'path';
import webpack from 'webpack';
import cssImport from 'postcss-import';
import cssNested from 'postcss-nested';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import mainConfig from './webpack.config.main.babel.js';

const src = process.env.SRC || 'src';
const outputPath = path.join(__dirname, 'app', 'dist');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

export default [
  {
    target: 'web',
    devtool: isProd ? '' : 'source-map',
    entry: {
      renderer: `./${src}/renderer/index.js`,
    },
    output: {
      path: outputPath,
      publicPath: '../dist/',
      filename: '[name].js',
    },
    externals(context, request, callback) {
      let isExternal = false;
      const load = [
        'electron',
      ];
      if (load.includes(request)) {
        isExternal = `require("${request}")`;
      }
      callback(null, isExternal);
    },
    module: {
      noParse: /node_modules\/localforage\/dist\/localforage.js/,
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /^((?!\.global).)*\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!postcss-loader',
          ),
        },
        {
          test: /^((?!\.global).)*\.css$/,
          include: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap!postcss-loader',
          ),
        },
        {
          test: /\.global\.css$/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap!postcss-loader',
          ),
        },
        {
          test: /^((?!\.global).)*\.scss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader',
          ),
        },
        {
          test: /^((?!\.global).)*\.scss$/,
          include: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap!postcss-loader!sass-loader',
          ),
        },
        {
          test: /\.global\.scss$/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap!postcss-loader!sass-loader',
          ),
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader?limit=10000',
        },
        {
          test: /\.(json|env|dll|dylib|so)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
          },
        },
      ],
    },
    postcss() {
      return [
        cssImport,
        cssNested,
      ];
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, `${src}/renderer/assets`),
        components: path.resolve(__dirname, `${src}/renderer/components`),
        models: path.resolve(__dirname, `${src}/renderer/models`),
        services: path.resolve(__dirname, `${src}/renderer/services`),
        theme: path.resolve(__dirname, `${src}/renderer/theme`),
        shared: path.resolve(__dirname, `${src}/shared`),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        $dirname: '__dirname',
        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv),
        },
      }),
      new ExtractTextPlugin('[name].css', {
        disable: false,
        allChunks: true,
      }),
    ],
  },
  mainConfig,
];
