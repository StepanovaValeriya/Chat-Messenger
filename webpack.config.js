const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("Clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 1234,
    compress: true,
    hot: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      handlebars: "handlebars/dist/handlebars.min.js",
      core: path.resolve(__dirname, "./src/core"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      helpers: path.resolve(__dirname, "./src/helpers"),
      utils: path.resolve(__dirname, "./src/utils"),
      constants: path.resolve(__dirname, "./src/constants"),
      services: path.resolve(__dirname, "./src/services"),
      api: path.resolve(__dirname, "./src/api"),
      store: path.resolve(__dirname, "./src/store"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "static/img", to: "img" }],
    }),
    new MiniCssExtractPlugin({
      filename: "style-[fullhash].css",
    }),
  ],
};
