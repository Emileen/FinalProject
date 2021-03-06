// Step 1: import gulp
let gulp = require('gulp');
let sass = require('gulp-sass');
let browser = require('gulp-browser');

// Step 2: create default task 
gulp.task('default', ['html', 'css', 'js']);

// Step 3: create subtasks
gulp.task('html', function () {
    // Now that I have a templates directory, I also need to copy 
    // those over.
    gulp.src('templates/*.html')
        .pipe(gulp.dest('public/templates'))
        .pipe(gulp.dest('src/main/resources/static/templates'));

    // Copy index.html into the public/ directory.
    return gulp.src('index.html')
        .pipe(gulp.dest('public/'))
        .pipe(gulp.dest('src/main/resources/templates/'));
});

gulp.task('css', function () {
    // Convert style.scss into style.css.
    // Copy to public/
    return gulp.src('scss/style.scss')
        .pipe(sass()) // requires gulp-sass
        .pipe(gulp.dest('public/css'))
        .pipe(gulp.dest('src/main/resources/static/css/'));
});

gulp.task('js', function () {
    // Copy js file into public/
    return gulp.src('js/app.js')
        .pipe(browser.browserify())
        .pipe(gulp.dest('public/js'))
        .pipe(gulp.dest('src/main/resources/static/js/'));
});

gulp.task('watch', ['default'], function () {
    // When a js file in js/ changes, run 'js' task
    gulp.watch('js/*.js', ['js']);
    gulp.watch('js/*/*.js', ['js']);
    gulp.watch('scss/*.scss', ['css']);
    gulp.watch('*.html', ['html']);
    gulp.watch('templates/*.html', ['html']);
});

