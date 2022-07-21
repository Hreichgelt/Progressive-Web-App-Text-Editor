const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



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
        swDest: 'src-sw.js',

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
        publicPath: './', 
        icons:[
          {
            src: path.resolve('./src/images/logo.png'), 
            sizes:[96, 128, 192, 256, 384, 512],  
          },
        ]
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // from lesson 26
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };

  
};
