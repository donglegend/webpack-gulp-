var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var fs = require("fs");
var path = require("path");

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})


var ops = {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}



var pages = function() {
  var dir = fs.readdirSync(path.resolve(__dirname, '../views/'));
  return dir.filter(function(name) {
    return name.match(/\.html$/);
  });
}();

for(var i = 0; i<pages.length; i++){
  var chunkname = pages[i];
  console.log(chunkname)
  var conf = {
    filename: chunkname,
    template: path.resolve(__dirname, '../views/'+chunkname),
    inject: false,
    // minify: {
    //     removeComments: true,
    //     collapseWhitespace: false
    // },
    // chunks: [chunkname.replace(/\.html/, "")],
    // hash: false
  }
  
  ops.plugins.push(new HtmlWebpackPlugin(conf));
}


module.exports = merge(baseWebpackConfig, ops)
