const { src, dest } = require('gulp');
const { watch, series, parallel } = require('gulp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const postcss = require('gulp-postcss');
const sorting = require('postcss-sorting');
const browserSync = require('browser-sync').create();

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



exports.sorting = () => {
    return  gulp.src('./dist/css/*.css').pipe(
        postcss([
            sorting({ 
                "order": [
                    "custom-properties",
                    "dollar-variables",
                    {
                      "type" : "at-rule",
                      "name" : "include",
                    },
                    {
                      "type"     : "at-rule",
                      "name"     : "include",
                      "hasBlock" : true
                    },
                    "declarations",
                    {
                      "type"     : "rule",
                      "selector" : /^&/
                    },
                    {
                      "type"     : "rule",
                      "selector" : /^&:\w+$/
                    },
                    {
                      "type"     : "rule",
                      "selector" : /^&:   : \w+$/
                    },
                    {
                      "type" : "at-rule",
                      "name" : "media"
                    }
                  ],
                  "properties-order": [
                    "order",
                    "z-index",
                    "position",
                    "top",
                    "bottom",
                    "left",
                    "right",
                    "content",
                    "visibility",
                    "backface-visibility",
                    "opacity",
                    "filter",
                    "mix-blend-mode",
                    "transform",
                    "transform-style",
                    "perspective",
                    "display",
                    "flex-direction",
                    "flex-flow",
                    "justify-content",
                    "align-items",
                    "align-content",
                    "flex-basis",
                    "flex-wrap",
                    "flex-grow",
                    "flex-shrink",
                    "grid",
                    "grid-template",
                    "grid-template-columns",
                    "grid-auto-columns",
                    "grid-template-rows",
                    "grid-auto-rows",
                    "grid-template-areas",
                    "grid-auto-flow",
                    "grid-gap",
                    "outline",
                    "outline-width",
                    "outline-style",
                    "outline-color",
                    "outline-offset",
                    "border",
                    "border-top",
                    "border-right",
                    "border-bottom",
                    "border-left",
                    "border-radius",
                    "border-collapse",
                    "margin",
                    "margin-top",
                    "margin-right",
                    "margin-bottom",
                    "margin-left",
                    "background",
                    "background-image",
                    "background-color",
                    "background-position",
                    "background-size",
                    "background-repeat",
                    "background-origin",
                    "background-clip",
                    "background-attachment",
                    "max-height",
                    "min-height",
                    "height",
                    "max-width",
                    "min-width",
                    "width",
                    "resize",
                    "box-sizing",
                    "overflow",
                    "overflow-x",
                    "overflow-y",
                    "scroll-behavior",
                    "object-fit",
                    "object-position",
                    "float",
                    "padding",
                    "padding-top",
                    "padding-right",
                    "padding-bottom",
                    "padding-left",
                    "empty-cells",
                    "list-style",
                    "list-style-image",
                    "list-style-type",
                    "list-style-position",
                    "text-indent",
                    "word-break",
                    "word-wrap",
                    "word-spacing",
                    "text-overflow",
                    "hyphens",
                    "white-space",
                    "text-decoration",
                    "vertical-align",
                    "text-transform",
                    "letter-spacing",
                    "direction",
                    "text-shadow",
                    "font",
                    "font-style",
                    "font-family",
                    "font-size",
                    "line-height",
                    "font-weight",
                    "font-stretch",
                    "font-kerning",
                    "font-variant",
                    "color",
                    "cursor",
                    "pointer-events",
                    "transition",
                    "transition-property",
                    "transition-duration",
                    "transition-timing-function",
                    "transition-delay",
                    "animation",
                    "animation-name",
                    "animation-duration",
                    "animation-timing-function",
                    "animation-delay",
                    "animation-iteration-count",
                    "animation-direction",
                    "animation-fill-mode",
                    "animation-play-state"
                  ],
                  "unspecified-properties-position" : "bottom"
             })
        ])
    ).pipe(
        gulp.dest('./dist/css/*.css')
    );
};




exports.img = () => {
    return gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('./dist/images'));
};

exports.browsersyncServe = () =>{
  browserSync.init({
    server: {
      baseDir: "dist"
  }
  });
 
}

function browsersyncServe(){
  browserSync.init({
    server: {
      baseDir: "dist"
  }
  });
 
}

function browsersyncReload(){
  browserSync.reload();
  
}



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

function watchTask() {
   watch('./src/**/**/*.pug').on( 'change', series(html, browsersyncReload));
    watch('./src/sass/**/*.scss', series(css,browsersyncReload));
}

exports.default = 
    parallel(html,css,img, parallel(watchTask,browsersyncServe));