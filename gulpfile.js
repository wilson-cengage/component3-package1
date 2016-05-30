var gulp = require('gulp-param')(require('gulp'), process.argv);

gulp.task('postbuild', function(packageName) {

    console.log(`Package Name from gulp parameter: ${packageName}`);
    // place code for your default task here

    gulp.src([`static/${packageName}/**`]).pipe(gulp.dest(`dist/${packageName}`));
    gulp.src([`static/${packageName}/**`]).pipe(gulp.dest(`components/${packageName}`));

});