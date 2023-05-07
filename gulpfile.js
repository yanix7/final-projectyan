// const { src, dest, series } = require('gulp');
const gulp = require('gulp');
const concat = require('gulp-concat');
const cssMinify = require('gulp-css-minify');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');

const buildHtml = () => {
    return gulp.src(['*.html', 'pages/**/*.html'])
    .pipe(gulp.dest('build/'));
}

const buildStyles = () => {
    return gulp.src('css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
}

const buildScript = () => {
    return gulp.src('ts/**/*.ts')
    .pipe(ts({
        noImplicitAny: true,
        outFile: 'script.js'
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
}

const build = () => {
    browserSync.reload();
    buildHtml();
    buildScript()
    buildStyles()
}

const start = () => {
    build();
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })
    gulp.watch('ts/**/*.ts', buildScript);
    gulp.watch('css/**/*.scss', buildStyles);
    gulp.watch(['pages/**/*.html', 'index.html'], buildHtml).on('change', browserSync.reload)
}

exports.build = build;
exports.buildStyles = buildStyles;
exports.default = start;