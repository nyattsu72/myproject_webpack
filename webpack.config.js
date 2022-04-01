const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer:{
    static: './dist',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'[name].css',
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      minify: false
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
            options:{
              importLoaders: 2,
            }
          },
          {
            loader:'postcss-loader',
            options: {
              postcssOptions: {
                plugins:[
                  [
                    'postcss-preset-env',{
                      browsers: "last 2 versions",
                      autoprefixer: { grid: true }
                    }
                  ],
                  [
                    'css-declaration-sorter',{
                      order:'smacss'
                    }
                  ],
                  [
                    'postcss-sort-media-queries',{
                      sort: 'mobile-first'
                    }
                  ]
                ]
              }
            }
          },
          {
            loader:'sass-loader',
            options:{
              implementation: require.resolve('sass'),
              sassOptions: {
                outputStyle: "compressed",
              },
            }

          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator:{
          filename:'images/[name][ext][query]'
        }
      },
    ],
  },
  target: ['web'],
};


