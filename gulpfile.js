const gulp = require('gulp');
const del = require('del');
const es = require('event-stream');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();

// Tasks
gulp.task('sass', () => {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(prefix('last 2 versions'))        
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('styles', () => {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('scripts', () => {
    return gulp.src('app/js/*.js')
        .pipe(minify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))        
});

gulp.task('clean', (cb) => {
    del.sync('dist/*');
    return cb();
});

gulp.task('move-files', (cb) => {
    es.merge([
        gulp.src('app/*.html').pipe(gulp.dest('dist/')),
        gulp.src('app/fonts/*').pipe(gulp.dest('dist/fonts')),
        gulp.src('app/images/*').pipe(gulp.dest('dist/images'))
    ]);    
    
    return cb();
});

// Live Preview
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Build
gulp.task('build', gulp.series('clean','styles','scripts','move-files'));