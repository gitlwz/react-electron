const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require("path");
module.exports = override(
    fixBabelImports("lodash", {
        libraryDirectory: "",
        camel2DashComponentName: false
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: "css",
    }),
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src")
    }),
    addLessLoader({
        javascriptEnabled: true,
    })
);