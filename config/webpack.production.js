const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    join
} = require('path');
module.exports = {
    // output: {
    //     filename: "assets/scripts/[name].bundule.js"
    // }
    plugins: [
        new CopyWebpackPlugin([{
            from: join(__dirname, "../", "src/webapp/views/common/layout.html"),
            to: '../views/common/layout.html'
        }]),
        // 生产环境对 js css  压缩
        new CopyWebpackPlugin([{
            from: join(__dirname, "../", "src/webapp/components"),
            to: '../views/components',
            transform(content) {
                // css hint
                // minify
            }
        }],{ 
            ignore: ["*.js", "*.css"]
        })

    ]
}