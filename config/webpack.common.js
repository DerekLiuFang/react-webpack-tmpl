const path = require("node:path");
const HtmlPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const {
  WebUpdateNotificationPlugin,
} = require("@plugin-web-update-notification/webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// console.log("NODE_ENV", process.env.NODE_ENV);
// console.log("BASE_ENV", process.env.BASE_ENV);
const isDev = process.env.NODE_ENV === "development";

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    index: path.join(__dirname, "../src/index.tsx"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "static/js/[name].[chunkhash:8].js",
    publicPath: "/", // 打包后文件的公共前缀路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: "babel-loader",
        include: [path.resolve(__dirname, "../src")],
      },
      {
        test: /\.(png|jpe?g|gif|svg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]",
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset/resource",

        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      // components: path.resolve(__dirname, "../src/components"),
      // router: path.resolve(__dirname, "../src/router"),
      // store: path.resolve(__dirname, "../src/store"),
      // apis: path.resolve(__dirname, "../src/apis"),
    },
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  cache: {
    type: "filesystem",
  },
  plugins: [
    new HtmlPlugin({
      path: path.resolve(__dirname, "../public/index.html"),
      inject: true, // 自动注入静态资源
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
    new WebUpdateNotificationPlugin({
      logVersion: true,
    }),
  ],
};
