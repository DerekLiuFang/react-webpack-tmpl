const commonConfig = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("node:path");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
/**
 * @type {import('webpack').Configuration}
 */
const devConfig = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 3000,
    hot: true, // 开启热更新
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    historyApiFallback: true, // 解决history路由404问题
    static: {
      publicPath: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
  },
  plugins: [new ReactRefreshPlugin()],
};

module.exports = merge(commonConfig, devConfig);
