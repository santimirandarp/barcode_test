import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
import HtmlWebpackPlugin from "html-webpack-plugin";
export default {
  mode: "development",
  entry: "./src/module.ts",
  output: {
    path: resolve(__dirname, "docs"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
