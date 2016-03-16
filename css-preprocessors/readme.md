# CSS Preprocessors

1. [Sass vs Less vs Stylus](#sass-vs-less-vs-stylus)
2. [Practical use](#practical-use)
3. [Gulp configuration](#gulp-configuration)


Now, we will discuss a new tool to help us creating CSS styles. These tools help us to create CSS styles easily, also they provide us loops and metaprogramming to create styles. These tools are called CSS preprocessors and we will use them from now on.

### Sass vs Less vs Stylus

Among these, there are three most popular it is worth to mention them:

- **Less** It is the most popular right now, it is so similar to use plain CSS, and it can be used directly in browser with just 1 js file to pre process Less Styles.
- **Sass** It is the second most popular preprocessor, it is mainly used in Ruby and Rails community and it has a huge community working actively in it.
- **Stylus** It is the less popular, but it is one of the most powerful. It is used with NodeJS and is the newest of them.

In our case, we will use Sass for this tutorial due to learning curve ease.

### Practical use

If you want to learn what Sass can offer you, please visit [Sass Guide][sass-guide-source]. In that link, you can find a great tutorial to get started with.

So, for this case I will show you how it differs from current CSS file:

````css
/* Sass file */
@mixin box {
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
}

$silver-background: #eaeaea;

.User {
  @include block;
  padding: 3em;
  background-color: $silver-background;
}

/* CSS output */
.User {
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  padding: 3em;
  background-color: #eaeaea;
}
````

One of the most useful things with CSS preprocessor is the ability to create mixins and variables within CSS, that allow us to reuse common code.


### Gulp configuration

Now, to create a correct configuration that allow us to use Sass with our project is to configure it with GULP.

Our first step is to install it.

````shell
$ npm install --save-dev node-sass
````

This will download the dependency for us and we can use it directly in our gulpfile.js

````javascript
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('./path/to/my/sass-file.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .on('error', handleErrors)
    .pipe(gulp.dest('./path/to/dist/css'))
});
````

Please note that our file must have a SCSS extension. This is because this kind of file is recognized by SASS as a SASS file.

Just with this little change creating a new task, we can now use SASS in our project.

[back to previous page](../README.md)

[sass-guide-source]:http://sass-lang.com/guide
