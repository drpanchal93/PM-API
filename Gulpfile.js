// var gulp = require('gulp');
// var nodemon = require('gulp-nodemon');
// var watch = require('gulp-watch');
//
// gulp.task('default', function() {
//   nodemon({ script : './server.js', ext : 'js' });
// });




var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('develop', function () {
  var stream = nodemon({ script: 'server.js'
          , ext: 'html js'
          , ignore: ['ignored.js']
          , tasks: ['lint'] })

  stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds
      })
})


// gulp.task('server', function() {
//     // configure nodemon
//     nodemon({
//         // the script to run the app
//         script: 'server.js',
//         // this listens to changes in any of these files/routes and restarts the application
//         watch: ["server.js", "app.js", "routes/", "models/*", 'public/*', 'public/*/**'],
//         ext: 'js'
//         // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
//     }).on('restart', () => {
//     gulp.src('server.js')
//       // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
//       .pipe(notify('Running the start tasks and stuff'));
//   });
// });
