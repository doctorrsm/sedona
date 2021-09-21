const { src, dest } = require('gulp');
const { watch, series } = require('gulp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

exports.views = () => {
    return src('./src/*.pug')
        .pipe(
            pug({
                // Your options in here.
                pretty: true
            })
        )
        .pipe(dest('./dist'));
};

function html() {
    return src('./src/*.pug')
    .pipe(
        pug({
            // Your options in here.
            pretty: true
        })
    )
    .pipe(dest('./dist'));
};

function css() {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
};


exports.default = function() {
    gulp.series(html,css);
    //watch('./src/*.pug', series(html));
    watch('./src/**/**/*.pug', series(html));
    watch('./src/sass/**/*.scss', series(css));
    
};