// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');

//// Lint Task
//gulp.task('lint', function() {
//    return gulp.src('js/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});
//
//// Compile Our Sass
//gulp.task('sass', function() {
//    return gulp.src('scss/*.scss')
//        .pipe(sass())
//        .pipe(gulp.dest('css'));
//});
//
//// Concatenate & Minify JS
//gulp.task('scripts', function() {
//    return gulp.src('js/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest('dist'))
//        .pipe(rename('all.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist'));
//});
//
//// Watch Files For Changes
//gulp.task('watch', function() {
//    gulp.watch('js/*.js', ['lint', 'scripts']);
//    gulp.watch('scss/*.scss', ['sass']);
//});
//
//// Default Task
//gulp.task('default', ['lint', 'bower', 'watch']);

//gulp.task('scripts', function () {
//
//    var jsFilter = gulpFilter('*.js');
//    var vendorFiles = gulp.src(mainBowerFiles())
//        .pipe(jsFilter)
//        .pipe(concat('vendor.js'));
//
//    var appFiles = gulp.src('app/*.js')
//        //.pipe(jshint())
//        //.pipe(jshint.reporter('default'))
//        .pipe(concat('app.js'));
//
//    return eventStream.concat(vendorFiles, appFiles)
//        .pipe(order([
//            "vendor.js",
//            "app.js"
//        ]))
//        .pipe(concat('app.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('../js'));
//});

gulp.task('vendor', function() {
    var jsFilter = gulpFilter('*.js');

    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('../js'));

});

gulp.task('app', function() {
    var jsFilter = gulpFilter('*.js');

    return gulp.src('app/*js')
        .pipe(jsFilter)
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('../js'));
});

gulp.task('watch', function() {
    gulp.watch('app/*.js', ['app']);
    //gulp.watch('bower_components/*.js', ['vendor']);
});

gulp.task('default', ['vendor', 'app', 'watch']);
