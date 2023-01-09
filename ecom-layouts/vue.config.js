const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const deps = require("./package.json");
module.exports = {
  publicPath: 'auto',
  configureWebpack: {
    mode: "development",
    cache: false,
    devtool: "source-map",
    optimization: {
      minimize: false,
      splitChunks: false,
    },
    target: "web",
    entry: path.resolve(__dirname, "./src/index.js"),
    resolve: {
      extensions: [".vue", ".jsx", ".js", ".json"],
      // alias: {
      //   // this isn't technically needed, since the default `vue` entry for bundlers
      //   // is a simple `export * from '@vue/runtime-dom`. However having this
      //   // extra re-export somehow causes webpack to always invalidate the module
      //   // on the first HMR update and causes the page to reload.
      //   vue: '@vue/runtime-dom',
      // },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "layouts",
        filename: "remoteEntry.js",
        exposes: {
          "./navbar": "./src/components/Navbar",
          "./footer": "./src/components/Footer",
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 3001,
  },
  transpileDependencies: ["vuetify"],
};
