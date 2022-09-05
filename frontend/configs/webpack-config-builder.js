const path = require("path");
const { merge } = require("webpack-merge");
const BundleTracker = require("webpack-bundle-tracker");

const makeBaseConfig = () => {
  return {
    entry: "./src/index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimize: true,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         },
       },
     },
    },
    output: {
      filename: "[name].[contenthash].js",
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  }
}

const makeDevConfig = () => {
  return merge(makeBaseConfig(), {
    devtool: "inline-source-map",
    devServer: {
      allowedHosts: "auto",
      compress: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      host: "0.0.0.0",
      port: 3000,
    },
    mode: "development",
    output: {
      publicPath: "http://localhost:3000/static/",
    },
    plugins: [
      new BundleTracker({
        filename: path.resolve(__dirname, "../webpack-stats.json"),
      }),
    ],
  })
}

const makeProdConfig = () => {
  return merge(makeBaseConfig(), {
    mode: "production",
    output: {
      path: path.resolve(__dirname, "../static/webpack_bundles/"),
    },
    plugins: [
      new BundleTracker({
        filename: path.resolve(__dirname, "../webpack-stats.json"),
      }),
    ],
  })
}

module.exports = {
  makeDevConfig,
  makeProdConfig
}
