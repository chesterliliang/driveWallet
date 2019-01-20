import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const src = process.env.SRC || 'src';

const outputPath = path.join(__dirname, 'app', 'dist');
export default {
  target: 'electron-main',
  entry: {
    main: [`./${src}/main/index.js`],
  },
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  externals(context, request, callback) {
    if (request === 'dotenv') {
      return callback();
    }

    callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        type: 'javascript/auto',
        test: /\.(json|env|dll|dylib|so)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      $dirname: '__dirname',
    }),

    new CopyWebpackPlugin([
      {
        from: './src/main/services/nodeSpeedWorker.js',
        to: path.join(__dirname, 'app', 'dist/nodeSpeedWorker.js'),
      },
    ]),
  ],
};
