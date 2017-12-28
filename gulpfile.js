const gulp = require('gulp');

gulp.task('build',function(){
    gulp.src('./demo/**')
        .pipe(gulp.dest('./demo-output'));
    return gulp.src('./core/canvas-sign.js')
        .pipe(gulp.dest('./dist'));
})