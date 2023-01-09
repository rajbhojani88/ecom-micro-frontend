const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
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
        name: "products",
        filename: "remoteEntry.js",
        exposes: {
          "./ProductsGrid": "./src/components/ProductsGrid",
          "./ProductsList": "./src/components/ProductsList",
          "./ProductDetails": "./src/components/ProductDetails",
          "./Cart": "./src/components/Cart",
          "./Success": "./src/components/Cart/success",
          "./Failed": "./src/components/Cart/failed",
          "./productsModule": "./src/store/productsModule",
        },
        shared: require("./package.json").dependencies,
      }),
    ],
  },
  devServer: {
    port: 3002,
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
