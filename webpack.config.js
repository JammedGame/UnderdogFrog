var path = require("path");
module.exports =
{
  entry:
  {
    app: ["./Code/App.ts"]
  },
  output:
  {
    path: path.resolve(__dirname, "build"),
    filename: "uf.js",
    publicPath: "/Resources/"
  },
  resolve:
  {
    extensions: ['.ts', '.tsx', '.js']
  },
  module:
  {
    loaders:
    [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}