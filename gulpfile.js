const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const entry = 'src/nodeui/**/*.js';
// 开发环境
function builddev() {
    return watch(entry, { ignoreInitial: false },function() {
        gulp.src(entry)
            .pipe(babel({
                "babelrc": false,
                "plugins": ["@babel/transform-modules-commonjs"]
            }))
            .pipe(gulp.dest('dist'))
    })  
}
// 上线环境
function buildprod() {
    return  gulp.src(entry)
    .pipe(babel({
        "babelrc": false,
        "ignore": ['./src/nodeui/config/*.js'],
        // babel编译要把配置文件忽略掉， 配置文件最后要打包到线上
        "plugins": ["@babel/transform-modules-commonjs"]
    }))
    .pipe(gulp.dest('dist'))
}
function buildconfig() {
    return  gulp.src(entry)
             // 配置文件 有开发环境的配置有线上环境的配置， 需要使用rollup 进行流清理， 只留下我们需要的
            .pipe(rollup({
                output: { 
                    format: 'cjs'
                },
                input: './src/nodeui/config/index.js',
                plugins: [
                    replace({
                      "process.env.NODE_ENV": JSON.stringify('production')
                    })
                ]
            }))
            .pipe(gulp.dest('./dist'));
}
// 代码lint
function buildlint() {
    
}

let build =  gulp.series(builddev);
if(process.env.NODE_ENV == 'production') {
    // config里面还有es6代码需要编译， gulp已经支持了并行编译，改变这里的顺序，则不支持
    // 如果不支持的话，需要安装一个gulp-sequence插件
    build =  gulp.series(buildconfig, buildprod);
}
if(process.env.NODE_ENV == 'lint') {
    build =  gulp.series(buildlint);
}
gulp.task("default", build);