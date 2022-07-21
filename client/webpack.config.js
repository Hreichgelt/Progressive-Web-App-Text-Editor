const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Client Server",
        template: "./index.html",
      }),
      new MiniCssExtractPlugin(),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',

      }),
      new WebpackPwaManifest({
        // Create a manifest.json: from 26 stu manifest
        name: "Text Editor",
        short_name: "JATE", 
        fingerprints: false, 
        inject: true,
        description: "Just Another Text Editor",
        background_color: "blue",
        start_url: './', 
        public_path: './', 
        icons:[
          {
            src: path.resolve('./assets/images/icon.png'), 
            sizes:[96, 128, 192, 256, 384, 512],  
          },
        ]
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };

  
};
