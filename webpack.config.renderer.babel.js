import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import path from 'path';

const serverIp = '127.0.0.1';
const serverPort = '4010';

export default {
  target: 'electron-renderer',
  entry: {
    renderer: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      './src/renderer/index.js',
    ],
  },
  output: {
    pathinfo: true,
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'app', 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'app', 'dist'),
    host: serverIp,
    port: serverPort,
    hot: true,
  },
  externals(context, request, callback) {
    let isExternal = false;
    const load = ['electron'];
    if (load.includes(request)) {
      isExternal = `require("${request}")`;
    }
    callback(null, isExternal);
  },
  module: {
    noParse: function(content) {
      return new RegExp('node_modules/localforage/dist/localforage.js').test(
        content
      );
    },
    rules: [
      {
        exclude: [
          /\.(html|ejs)$/,
          /\.json$/,
          /\.(js|jsx|ts|tsx)$/,
          /\.(css|less|scss|sass)$/,
        ],
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.js$/,
        include: __dirname,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              // "babelrc": false
            },
          },
        ],
      },
      {
        test: /\.jsx$/,
        include: __dirname,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              // "babelrc": false
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /^((?!\.global).)*\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
      {
        test: /^((?!\.global).)*\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
      {
        test: /\.global\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
      {
        test: /^((?!\.global).)*\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /^((?!\.global).)*\.(sass|scss)$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.global\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/renderer/assets'),
      components: path.resolve(__dirname, 'src/renderer/components'),
      models: path.resolve(__dirname, 'src/renderer/models'),
      services: path.resolve(__dirname, 'src/renderer/services'),
      theme: path.resolve(__dirname, 'src/renderer/theme'),
      shared: path.resolve(__dirname, 'src/shared'),
      dva: 'dva-react-router-3',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['renderer'],
      template: './src/renderer/template.ejs',
      filename: 'index.html',
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

  performance: {
    hints: false,
  },
};

export { serverIp, serverPort };
