const isDev = process.env.NODE_ENV === "development";
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // 配置使用core-js低版本
      },
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  // 如果是开发模式,就启动react热更新插件
  plugins: [isDev && require.resolve("react-refresh/babel")].filter(Boolean),
};
