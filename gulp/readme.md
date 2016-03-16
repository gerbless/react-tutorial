# GULP

1. [What is gulp](#what-is-gulp)
2. [Task creation](#task-creation)
3. [The Default task](#the-default-task)
4. [Tasks in watch mode](#tasks-in-watch-mode)
5. [Real example with GULP](#real-example-with-gulp)
6. [Gulp with browserify](#gulp-with-browserify)
7. [Gulp with webpack](#gulp-with-webpack)


Everyone had done repetitive tasks during projects, some of these task had been:

- compress JS files
- preprocess CSS files
- compress CSS files
- compress image files
- merge files in just 1 file
- copy ready-to-use files to a dist folder or similar

So, to avoid all these tasks(in which we are prone to make mistakes), we will use GULP to help us to get rid of this.


### What is gulp

GULP is a task automator. With it you can create tasks that allow us to automate whatever task you want.

In our current bundle we have downloaded it, so we will not need to install anything. The only requirement is that we need to have a `gulpfile.js` file in our current folder.


### Task creation

To create task with GULP, we need to do it in this way

````javascript
gulp.task(taskName, callback);
````

So, with this short brief, we can start to create a gulp task as an example. We will create a task that can copy to a dist folder the following files:

- styles.css
- jquery.min.js ( or zepto if we installed it)

````javascript
var gulp = require('gulp');

gulp.task('copy', function(){
  var source = [
    './static/css/styles.css',
    './static/css/js/vendor/zepto.min.js'
  ];

  return gulp.src(source).pipe(gulp.dest('./dist'));
});
````

Now, to use this task to do that "huge" amount of work, we need to execute in the console this:

````shell
$ gulp copy
````

Probably you will get this message in console:

![screen][screen10]

So to fix this we can do two things:

1.- Install gulp globally
1.- Create a NPM task locally

So if you want to install gulp in our global environment(which is not that bad) we can do it in this way

````shell
$ npm install --global gulp
````

So, when it finishes the install, you can run that task without troubles.

However, if you do not want to pollute our global environment with gulp(as I recommend you), you can create a NPM task to run GULP (within package.json)

````json
"scripts": {
  "start": "npm run server & npm run sass",
  "build": "webpack --progress --colors",
  "build-prod": "webpack --optimize-minimize --progress --colors",
  "server": "webpack-dev-server",
  "sass": "node-sass --watch --output-style=compact --indent_type=space --indent_size=2 --linefeed=lf static/css/styles.scss static/css/styles.css",
  "gulp": "gulp copy"
}
````

with that little change we can run gulp with this command

````shell
$ npm run gulp
````

After executing this task, now our folder structure should look similar to this

![screen][screen11]

So, the other thing we can do with tasks here is to create tasks that depends upon other tasks

Let me show you an example of this

````javascript
gulp.task(taskName,['fooTask', 'barTask'], function(){
  //some lines of code right here
});
````

As you can see, this open us a bunch of possibilities in front of us

### The Default task

If we need that just one task calls others, we can achieve this with the **default** task. So this one can call others, E.g.:

````javascript
gulp.task('task-a', function(){
  //code task a
});

gulp.task('task-b', function(){
  //code task b
});

gulp.task('task-c', function(){
  //code task c
});

gulp.task('default', ['task-a', 'task-b', 'task-c']);
````

However, these tasks are being executed in parallel, so you must be careful if you do not want to have unexpected behaviours.

Then, to execute your default task, just run this

````shell
# if you have installed gulp globally
$ gulp

# or if you are like me, then this command should be for you
$ npm run gulp
````

### Tasks in watch mode

Thus, GULP has show us a lot of possibilities to do what we want. But ... one thing that bothers me right now, is the repeating task of executing our command again and again and so on. Don't you think if we could just save a file and GULP execute tasks for us ?

Well, I can say you ... YES WE CAN!. But to do this, we need one additional feature of GULP, that one is put tasks in watch mode.

How to do it ?, well it is time to show this magic

````javascript
//just for good practices we call this task watch, but it might be named as you wish
gulp.task('watch', function(){
  return gulp.watch(fileLookupArray, tasksToRunArray);
});
````

Each of these arguments are explained below

- fileLookupArray this is an array of files that we want to watch for changes.
- tasksToRunArray this is an array of tasks that we want to run of something is changed.

so, in this case we would simulate that we have `script-lookup.js` and `style-lookup.css` to watch. A task for watch these files can be something like this

````javascript
gulp.task('task-a', function(){
  //code to do something with a
});

gulp.task('watch', function(){
  return gulp.watch([
    'script-lookup.js',
    'style-lookup.css'],
    ['task-a']
  );
});
````

### Real example with GULP

If you want to see a real example of a gulpfile.js you can check this one(it is just one gulpfile that I use in my toy projects):

````javascript
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var exec = require('child_process').exec;
var fs = require('fs')
var path = require('path');

function handleError(){
  var args = [].slice.call(arguments);

  notify.onError({
    title: 'compile error',
    message: '<%= error.message %>'
  }).apply(this, args);
}

function defaultError(type){
  return function(err){
    console.log(type + ' error : ' + err);
  };
}

function realPath(xs){
  return './' + xs;
}

var apps = [{input: 'js/apps/example_app.jsx', output:'example.bundle.js'}];

var styles = [].map(realPath);

gulp.task('startproject', function(){
  [ 'css/components', 'images', 'fonts',
    'js/actions', 'js/apps', 'js/bundles',
    'js/components', 'js/services', 'js/stores',
    'js/vendor', 'js/utils'
  ].map(realPath).forEach(function(folderName){
    exec('mkdir -p ' + folderName);
  });
});

gulp.task('css', function(){
  var g = gulp.src(styles)
    .pipe(stylus({compress: true}))
    .on('error', defaultError('stylus'))
    .pipe(gulp.dest(realPath('css/')));

  return g;
});

gulp.task('build', function(){
  return apps.map(function(opt){
    var choices = {
      entries: [realPath(opt.input)],
      extensions: ['.js', '.jsx']
    };

    var presets = {presets: ['es2015', 'react', 'stage-2']};

    return browserify(choices)
      .transform(babelify.configure(presets))
      .bundle()
      .on('error', handleError)
      .pipe(source(opt.output))
      .pipe(gulp.dest(realPath('js/bundles')));
  });
});

gulp.task('watch', function(){
  gulp.watch([
    'js/components/**/*',
    'js/services/*',
    'js/apps/*',
    'js/actions/*',
    'js/stores/*'
  ].map(realPath), ['build']);

  gulp.watch(['css/**/*.styl'].map(realPath), ['css']);
});

gulp.task('default', ['css', 'build', 'watch']);
````

### Gulp with browserify

We will use for this case **Browserify** and **Babel** for these tasks

- Transpile ES6 code to ES5.
- Transpile JSX code to javascript.
- The possibility to use modules and can be used in browsers.

So our task should look like this:

````javascript
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// rest of code
// rest of code
// rest of code
// rest of code
// rest of code

gulp.task('build', function(){
  var choices = {
    entries: ['./main.js'],
    extensions: ['.js', '.jsx']
  };

  //we will use these presets to work with
  // - es2015 -> this will let us to work with ES6
  // - react -> we can use JSX inside javascript without worry about that syntax
  // - stage-2 -> to use object spread
  var presets = {presets: ['es2015', 'react', 'stage-2']};

  return browserify(choices)
    .transform(babelify.configure(presets))
    .bundle()
    .on('error', handleError)
    .pipe(source('main.bundle.js'))
    .pipe(gulp.dest('bundles'));
});
````

### Gulp with webpack

Well, lets do this same thing in Webpack

````javascript
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

//we require the webpack configuration from this same folder
var webpackConfig = require('./webpack.config.js');

//we create our compiler
var devCompiler = webpack(webpackConfig);

gulp.task('webpack-build-dev', function(callback){
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError('webpack-build-dev', err);
    gutil.log('webpack-build-dev', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('default', ['webpack-build-dev']);
````

This will produce development code, but instead we want to create production code, we can do this

````javascript
gulp.task('webpack-build-prod', function(callback){
  var webpackProdConfig = Object.assign({}, webpackConfig);
  webpackProdConfig.output.filename = 'bundle.min.js';
  webpackProdConfig.devtool = null;
  webpackProdConfig.debug = false;
  webpackProdConfig.plugins = [
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': 'production'}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ];

  webpack(webpackProdConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack-build-prod', err);
    gutil.log('webpack-build-prod', stats.toString({colors: true}));
    callback();
  });
});
````

So, we just have done both ways of doing gulp tasks with browserify and webpack. In my opinion, browserify is good enough for simple use cases. But if you want real power you should consider using webpack.

[back to previous page](../README.md#gulp)

[gulp-api-source]:https://github.com/gulpjs/gulp/blob/master/docs/API.md
[screen10]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen10.png
[screen11]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen11.png
