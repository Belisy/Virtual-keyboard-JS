const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMiniMizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  devtool: "source-map", //빌드한 파일과 원본파일을 연결시켜줌
  mode: "development", // development와 production 차이는 JS,CSS,HTML 난독화기능 제공여부
  devServer: {
    host: "localhost",
    port: 8080,
    open: true, // 새 창열기
    watchFiles: "index.html", // 변경 감지하면 리로드해줌
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Virtual Keyboard",
      template: "./index.html", // html파일에서 lodash 자동으로 사용가능하게 해줌
      inject: "body", // js를 body에 넣어줄지 head에 넣어줄지 설정
      favicon: "./favicon.ico",
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],

  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMiniMizerPlugin()],
  },
};
