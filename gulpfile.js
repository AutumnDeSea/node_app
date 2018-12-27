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
        "plugins": ["@babel/transform-modules-commonjs"]
    }))
    .pipe(gulp.dest('dist'))
}
function buildconfig() {
    return  gulp.src(entry)
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
    build =  gulp.series(buildprod, buildconfig);
}
if(process.env.NODE_ENV == 'lint') {
    build =  gulp.series(buildlint);
}
gulp.task("default", build);