const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const glob = require('glob');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const _mode = argv.mode || "develoment";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = (_mode == "production" ? true : false);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterWebpackPlugin = require("./config/HtmlAfterWebpackPlugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const {
    join
} = require('path');
// import {join} from 'path';
// glob 帮助我们找到匹配文件目录

// 寻找entry
// {
//     "books-add": "books-add-entry.js",
//     "books-index": "books-add-index.js",
// }
const files = glob.sync('./src/webapp/views/**/*.entry.js');
let _entry = {};
let _plugins = [];
for (let item of files) {
    // 正则分组
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
        const entryKey = RegExp.$1;
        _entry[entryKey] = item;
        const [dist, template] = entryKey.split('-');
        console.log('🍎', entryKey)
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/webapp/views/${dist}/pages/${template}.html`,
            inject: false,
            //   需要关掉这个inject， 否则插入到页面底部， 但是这样webpack不帮助我们处理chunks
            chunks: ["runtime", "common", entryKey],
            minify: {
                collapseWhitespace: _modeflag,
                removeComments: _modeflag
            }

        }))
    }
}
const webpackConfig = {
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, ],
    },
    entry: _entry,
    // watch: !_modeflag,
    output: {
        path: join(__dirname, "./dist/assets"),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    plugins: [
        ..._plugins,
        new HtmlAfterWebpackPlugin(),
        new ManifestPlugin(),
        new LiveReloadPlugin()
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, ],
    },
};
module.exports = merge(_mergeConfig, webpackConfig);