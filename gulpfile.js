var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var DEST = 'dist/';

gulp.task('default', function() {
  return gulp.src(['analytics.js','node_modules/video.js/dist/video-js/video.js','node_modules/jquery/dist/jquery.min.js','node_modules/video.js/dist/cdn/video-js.css','node_modules/video.js/dist/cdn/video-js.swf','iframe.html'])
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    //.pipe(uglify())
    //.pipe(rename({ extname: '.min.js' }))
    //.pipe(gulp.dest(DEST));
});

