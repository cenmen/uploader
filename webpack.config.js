const path = require("path")

module.exports = {
  entry: "./uploader.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "uploader.js",
    library: "uploader",
  },
}