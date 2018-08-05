// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    postcss = require('gulp-postcss'),
    inlinesvg = require('postcss-inline-svg');

var pluginsJS = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    'node_modules/lightslider/src/js/lightslider.js'
];

var paths = {
    styles: {
        src: '_scss/styles.scss',
        dest: 'css/'
    },
    scripts: {
        src: [
            '_custom_plugins/*.js',
            '_js/**/*.js'
        ],
        dest: '_js.min/'
    },
    images: {
        src: 'img/official/*'
    }
};

//////////////////////////////////////////////

// WATCH AREA

// compile scss -> .css -> min.css
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 20 version'],
            cascade: false
        }))
        .pipe(postcss([
            inlinesvg
        ]))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('../scss-maps/'))
        .pipe(gulp.dest(paths.styles.dest));
}

// Compile _js -> _js.min
function scripts() {
    return gulp.src(paths.scripts.src, {sourcemaps: true})
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Optimization Image
function images () {
    return gulp.src('img/official/*')
        .pipe(newer(paths.images.src))
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
        ]))
        .pipe(gulp.dest('img/official'));
}

// Concatenate & Minify JS, CSS PLUGINS
gulp.task('plugins', gulp.series(function() {
    // concat minify plugins JS
    return gulp.src(pluginsJS)
        .pipe(concat('_plugins-all.min.js')).on('error', sass.logError)
        .pipe(uglify())
        .pipe(gulp.dest('.'));
}));

gulp.task('watch', function () {
    gulp.watch([
        '_js/*.js',
        '_custom_plugins/*.js'
    ], scripts);
    gulp.watch('_scss/**/*.scss', styles);
    gulp.watch('img/official/**/*.jpg', images);
});

//////////////////////////////////////////////

gulp.task('scss', gulp.series(styles));
gulp.task('js', gulp.series(scripts));
gulp.task('images', gulp.series(images));
gulp.task('default', gulp.series(
    gulp.parallel(styles, scripts),
    'watch'
));
