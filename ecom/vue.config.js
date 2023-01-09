const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const deps = require("./package.json");
module.exports = {
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
        name: "ecom",
        filename: "remoteEntry.js",
        remotes: {
          layouts: "layouts@http://localhost:3001/remoteEntry.js",
          products: "products@http://localhost:3002/remoteEntry.js",
          auth: "auth@http://localhost:3003/remoteEntry.js",
        },
        exposes: {},
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 3000,
    proxy: {
      "^/api": {
        target: "http://localhost:8000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
