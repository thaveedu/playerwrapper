var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var htmlreplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var DEST = 'dist/';

gulp.task('default', function() {
    gulp.src(['iframe.html'])
    // See http://mdn.io/string.replace#Specifying_a_string_as_a_parameter
    .pipe(replace('node_modules/video.js/dist/cdn/video-js.swf', 'video-js.swf'))
    .pipe(htmlreplace({
        'css': 'joongang.min.css',
        'js': 'joongang.min.js'
    }))
    .pipe(gulp.dest(DEST));

    gulp.src(['node_modules/video.js/dist/video-js/font/**'])
    .pipe(gulp.dest(DEST+"/f/3"));
    
    gulp.src(['node_modules/video.js/dist/cdn/video-js.swf','oceans.png'])
    .pipe(gulp.dest(DEST));
    
    gulp.src(['node_modules/video.js/dist/cdn/video-js.css'])
    // This will output the non-minified version
        //.pipe(gulp.dest(DEST))
        .pipe(sourcemaps.init())
        .pipe(concat('joongang.css'))
        .pipe(sourcemaps.write())
        //.pipe(uglify())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST));
     
    gulp.src(['analytics.js','node_modules/video.js/dist/video-js/video.js','node_modules/jquery/dist/jquery.min.js'])
    // This will output the non-minified version
        //.pipe(gulp.dest(DEST))
        .pipe(sourcemaps.init())
        .pipe(concat('joongang.js'))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(DEST));

    return true;
});

