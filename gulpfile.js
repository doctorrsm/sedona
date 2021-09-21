const { src, dest } = require('gulp');
const { watch, series } = require('gulp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');

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

function img() {
    return gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('./dist/images'));
};


function css() {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
};


exports.default = function() {
    gulp.series(html,css,img);
    //watch('./src/*.pug', series(html));
    watch('./src/**/**/*.pug', series(html,css,img));
    watch('./src/sass/**/*.scss', series(html,css,img));
    
};