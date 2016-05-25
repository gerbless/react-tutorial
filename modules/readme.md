# Modules

In the past, Javascript did not have a module system as other languages do. All variables that were not bound to an object they were bound to global space. This was a bad design choice from Brendan Eich(but I could not complain to him, this language just took 10 days to be designed and implemented).

To solve this issue, many developers did choose to follow two options to encapsulate their code:

- Using module pattern
- Using namespace method

Using a module pattern, we can encapsulate all our code that is related to internal behavior. We just have public modules to interact with.

```javascript
/*
    Using a module pattern is as easy as just create a closure and expose methods to work with.
*/
var myModule = (function(){
  //internal data we want to keep private
  var myPrivateCounter = 0;

  //public interface to work with
  return {
    increment: function(){
      myPrivateCounter++;
    },

    getCounter: function(){
      return myPrivateCounter;
    }
  };
})();
```

Another approach we can take is to just use namespaces. With this technique, we avoid to pollute the global space due we are just using 1 namespace instead of multiple variables, functions and objects globally.

```javascript
//using namespaces
window.namespace = {};
namespace.utils = {};
namespace.models = {}
//..... code and more code
//..... code and more code

namespace.utils.rutFormatter = function(rut){
  //........
  return newRut;
};
```

When nodeJS appeared, it was created a module system specification(named commonJS). This spec, has a module system in this way:

exporting modules

```javascript
//exporting modules with commonJS syntax
module.exports = {
  foo: function(num, workerName){
    return workerName + '-' + num;
  }
};
```

importing modules

```javascript
//importing modules with commonJS syntax
var myModule = require('../utils/myModule');

myModule.foo(1, 'dave');
```

This same functionality is possible now in browsers thanks to Browserify and Webpack. Each of these implement this spec. If you use one of these package bundlers we can be happy to get all this benefits.

Now, ES6 proposed their own enhanced spec to modules. This new approach is more powerful than commonJS, allowing us to import and statically analyze code. Unfortunately, not all browsers support this spec yet; however, we can use it right now thanks to babel. Babel can transpile this code into old known commonJS syntax.

The biggest difference between Browserify and Webpack is that Browserify is easier to use, because it does not have too much configuration to get started. Webpack instead, is a lot more configurable and powerful, but it requires a more detailed configuration to begin to work with.

In this tutorial we have used Webpack in the background. We will learn how to use both of them and how to use them with GULP.
