# Functional programming in Javascript

1. [Introduction](#introduction)
2. [What is functional programming](#what-is-functional-programming)
3. [First example](#first-example)
4. [Foreach method](#foreach-method)
5. [Map method](#map-method)
6. [Filter method](#filter-method)
7. [Reduce method](#reduce-method)
8. [Chaining methods](#chaining-methods)
9. [Closures](#closures)
10. [Higher order functions](#higher-order-functions)
11. [Recursion](#recursion)
12. [Curry](#curry)
13. [Compose](#compose)
14. [Point free programming](#point-free-programming)
15. [Functors](#functors)
16. [Monads](#monads)


## Introduction

One of the most important thing about React is not just create UI components and its virtual DOM which makes the rendering process faster. React and Flux open us a way of doing things in a reactive way. The data immutability, one way data flow invite us to program in a new paradigm.

This paradigm is called functional programming and we will explain it and how this can aid us to write better code.


## What is functional programming

If we search in wikipedia about functional programming we can find this

> In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. It is a declarative programming paradigm, which means programming is done with expressions. In functional code, the output value of a function depends only on the arguments that are input to the function, so calling a function f twice with the same value for an argument x will produce the same result f(x) each time. Eliminating side effects, i.e. changes in state that do not depend on the function inputs, can make it much easier to understand and predict the behavior of a program, which is one of the key motivations for the development of functional programming.

With all this definition we can find some goals to achieve with this new approach:

- **Idempotence**: Functions that receive the same input always returns the same output.
- **Referential transparency**: Functions do not alter any state outside their scope. This avoid any race conditions that in imperative programming is commonly found.
- **Composable**: As objects can be composable in Object Oriented Programming, a function in functional programming can be composed by several functions.
- **Parallelizable**: One of the key features of functional programming is avoid to use assignation and avoid side-effects. With these ideas in mind, we can avoid to think how to deal with threads and share variables and dead-locks and all that stuff.

## First example

So, how to code like a functional programmer?, well .... to know how to we must create an example doing our code like we do always.

Now, we want to do a function that process all workers we give to it and returns me only:

- workers that are male.
- all these workers must get a year in their age

```javascript
var people = [
  { name: 'robert', gender: 'male', age: 21 },
  { name: 'lucy', gender: 'female', age: 30 },
  { name: 'mike', gender: 'male', age: 25 },
  { name: 'jennifer', gender: 'female', age: 39 },
  { name: 'john', gender: 'male', age: 45 },
  { name: 'susan', gender: 'female', age: 25 }
];

function workersSumOneYear(workers, gender){
  var results = [];

  for(var i = 0; i < workers.length; i++){
    var worker = workers[i];
    if(worker.gender == gender){
      worker.age = worker.age + 1;
      results.push(worker);
    }
  }

  return results;
}

console.log('people 1', people);
console.log("\n\n\n");
console.log(workersSumOneYear(people, 'male'));
console.log("\n\n\n");
console.log('people 1', people);
```

The first thing we note here:

- we achieve our purpose, delivering a new list
- we have mutated our original list with the new values

Well, we have done a little mistake by mutating our original array. We do not want to have this behavior so we can do a workaround to get this little bug erased from our function:

```javascript
var results = [];

for(var i = 0; i < workers.length; i++){
  //var worker = workers[i];
  //we clone the original object to not affect the original one
  var workers = Object.create(workers[i]);
  if(worker.gender == gender){
    worker.age = worker.age + 1;
    results.push(worker);
  }
}

return results;
```

Now, we are done. Our function makes that is intended to and we are happy because we are not introducing unexpected behavior to our program.

However, we are getting some stuff that we always do in common E.g. traversing an array. Why do we need all this ceremony just to do this. What if we have the ability of just focus in what is important like all the things we do inside our for loop ?.

Well, we can do it in several ways that I will show you.

## Foreach method

The Array.forEach method allow us to traverse an array without having to declare how to traverse it explicitly. This allow us to take care that important thing we are doing inside our loop.

This method just need one thing, a function to execute each time a new element in our list is used.

So, for example

```javascript
var users = [
  { name: 'maria', role: 'architect' },
  { name: 'johanna', role: 'backend'},
  { name: 'fernando', role: 'frontend'},
  { name: 'steve', role: 'sys admin'},
  { name: 'sandra', role: 'ux' }
];

//traditional For loop
for(var i = 0; i < users.length; i++){
  var user = users[i];
  console.log('the user %s with the role %s', user.name, user.role);
}

//foreach method
users.forEach(function(user){
  console.log('the user %s with the role %s', user.name, user.role);
});
```

As you can see, it is a lot easier to do than just to take care of traversing the array ourselves. How this works in background ?, well it works similar to this:

```javascript
Array.prototype.forEach = function(callback){
  var arr = this, length = this.length, i;

  for(i = 0; i < length; i++){
    callback( arr[ i ], i );
  }
};
```

**Note** this method and the rest of them are implemented in Javascript, just for teaching purposes they are being re implemented.


## Map method

The map method is other abstraction that allows us to convert an A list to a B list without do any modifications in the original List.

```javascript
var numbers = [1, 2, 3, 4];
var doubledNumbers = numbers.map(function(num){ return num * 2; });

console.log('original numbers', numbers);
console.log('doubled numbers', doubledNumbers);
```

doubledNumbers, in fact, is a new array that is the result of the map function traversing every element inside in numbers array.

The background implementation of map is similar to this:

```javascript
Array.prototype.map = function(conversorFunction){
  var results = [];

  this.forEach(function(element){
    results.push(conversorFunction(element));
  });

  return results;
};
```

## Filter method

We have learned how to traverse an array with **forEach**, mappping a listA to listB. Also, we can filter list elements with the **filter** method. Similar to map, filter returns a new list, but it differs from map because this list must return a boolean indicating if our element should be kept or not.

To show you this, we can see the code below

```javascript
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var evenNumbers = numbers.filter(function(num){ return num % 2 == 0 });
var oddNumbers = numbers.filter(function(num){ return num % 2 != 0 });

console.log(numbers);//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(evenNumbers);//[2, 4, 6, 8, 10]
console.log(oddNumbers);//[1, 3, 5, 7, 9]
```

The background implementation of filter can be similar to this:

```javascript
Array.prototype.filter = function(predicateFunction){
  var results = [];

  this.forEach(function(element){
    if(predicateFunction(element)){
      results.push(element);
    }
  });

  return results;
};
```

## Reduce method

Reduce is other method that is useful to reduce list to a unique result. Reduce just needs two parameters.

- reductor function to make the reduction possible
- initialValue to begin the reduction

With this in mind we can do something like

```javascript
var numbers = [3, 5, 2, 5, 10, 20];
var sum = numbers.reduce(function(acc, val){ return acc + val }, 0);

console.log('numbers to make a sum', numbers);
console.log(sum);//45
```

This is really useful with other functionalities we will learn later.

To view a possible implementation of reduce function, you can see this

```javascript
Array.prototype.reduce = function(reducer, initialValue){
  initialValue = initialValue || '';

  this.forEach(function(element){
    initialValue = callback(initialValue, element);
  });

  return initialValue;
};
```

## Chaining methods

The most important thing about previous methods is that they can be chained together to make great things. So we will use this feature to refactor our legacy imperative code:

```javascript
var people = [
  { name: 'robert', gender: 'male', age: 21 },
  { name: 'lucy', gender: 'female', age: 30 },
  { name: 'mike', gender: 'male', age: 25 },
  { name: 'jennifer', gender: 'female', age: 39 },
  { name: 'john', gender: 'male', age: 45 },
  { name: 'susan', gender: 'female', age: 25 }
];

function workersWithAddedYear(people, gender){
  return people
    .filter(function(worker){
      return worker.gender == gender;
    })
    .map(function(worker){
      var olderWorker = Object.create(worker);
      olderWorker.age = olderWorker.age + 1;
      return olderWorker;
    });
}

//also we could leave it just like an expression
var olderWorkers = people
  .filter(function(worker){
    return worker.gender == 'male';
  })
  .map(function(worker){
    var olderWorker = Object.create(worker);
    olderWorker.age = olderWorker.age + 1;
    return olderWorker;
  });

console.log(people);
console.log(workersWithAddedYear(people, 'male'));
console.log(olderWorkers);
```

As you can see, these functions can be chained together and each of these functions do not alter the previous array.

## Closures

Closures, according to wikipedia is this:

> In programming languages, closures (also lexical closures or function closures) are a technique for implementing lexically scoped name binding in languages with first-class functions. Operationally, a closure is a record storing a function together with an environment a mapping associating each free variable of the function (variables that are used locally, but defined in an enclosing scope) with the value or storage location to which the name was bound when the closure was created.A closure—unlike a plain function—allows the function to access those captured variables through the closure's reference to them, even when the function is invoked outside their scope.

In simpler words, are functions that can hold a state. How is this useful ?, well check the example below

```javascript
function counter(){
  //this is our internal count value
  var count = 0;

  var counterObj = {
    increment: function(){
      return ++count;
    },
    decrement: function(){
      return --count;
    },
    getCount: function(){
      return count;
    }
  };

  //we are returning the counterObj to use it outside of this function
  return counterObj;
}

var myCounter = counter();
console.log(myCounter.increment());//returns 1
console.log(myCounter.increment());//returns 2
console.log(myCounter.increment());//returns 3
console.log(myCounter.getCount());//returns 3
console.log(myCounter.decrement());//returns 2
```

What is happening here ? well, we have create a closure holds inner state hide from us. This is a really useful feature that Javascript offer us.

## Higher order functions

Higher order functions are functions that do at least one of this things:

- take one or more functions as arguments.
- returns function as its result.

The returning function or the receiving functions are known as **lambdas**. higher order functions are really powerful, they allow us to do generic utility functions and when is needed we can just have to deal with the detailed implementation of something, we can send a lambda to do that.

Do you remember filter and map methods of the array object ? Well, these methods are also higher order functions that receive a function to do the specific rules you are implementing. They only send you what you need and you return to them what they need.

These functions keep their generic usefulness without to deal with specific business rules.

Do you recognize this code ?

```javascript
$.get('/some/path', function(data){
  //lines of code
});
```

As you can imagine, jQuery's get method also is a higher order function. It deals with all the implementation of AJAX request, but it does not have to deal with the specific business rules that you have to do. Also, you do not have to deal with all the complexity of AJAX requests, you just need to deal how to process that data sent from the server.

## Recursion

Recursion is a very used and common technique within functional programming. This consists in a function calling itself until it does not. It Sounds weird, but if you care about what it means, it has no magic inside.

Many programmers can do an example with recursion implementing fibonacci sequence, but we are going to do it simpler.

We are going to implement a countdown that outputs its value with recursion.

```javascript
function countdown(number){
  console.log('countdown', number);
  countdown(number - 1);
}

countdown(10);
```

As you can see, sooner or later this script will halt because of **maximum call stack exceeded**. It is because Javascript unlike pure functional programming languages it does not support **tail call optimization** and is based until ES6 in call stack optimization.

Well, this definition does not help us, so as I said before, this functions can invoke itself until it does not. How to do that ? just use a conditional:

```javascript
function countdown(number){
  if(number < 0) return;
  console.log('countdown', number);
  countdown(number - 1);
}

countdown(10);
```

As you can see, recursion allows to express code in a very concise and elegant way. If you are wondering, In which case of the "real world", this knowledge can be applied ?.

Let's suppose we want our GULP tasks can be executed properly. According to a list of task to be executed, be also should check if they have subtasks to be executed too and add them to our tasks to be executed.

```javascript
//original tasks to be executed
var tasks = ['js', 'css'];

//our tasks structure to be traversed
var configTasks = {
  build: ['css', 'js', 'compress'],
  js: ['js-lint', 'transform'],
  css: ['sass', 'shim'],
  server: ['load-dev-server']
};

//resulting tasks to be executed
var resultingTasks = [];

/*
  we traverse our array, searching all the task to be executed.
  - if our task has subtasks, traverse that array and add them to our array.
  - if our task has not subtasks, just add this task to our to-do list.
*/
tasks.forEach(function(task){
  if(task in configTasks){
    configTasks[task].forEach(function(innerTask){
      resultingTasks.push(innerTask);
    });
  }else{
    resultingTasks.push(task);
  }
});

//the resulting array is this: [js-lint, transform, sass, shim]
console.log(resultingTasks);
```

Until now, our code works as expected. But what happens when we instead of call CSS and JS tasks we change them to call directly BUILD task ?.

Well, our code will not do what we want. So, to traverse the build key and keep the former functionality we should do something like this:

```javascript
var tasks = ['build', 'otherTask'];

var configTasks = {
  build: ['css', 'js', 'compress'],
  js: ['js-lint', 'transform'],
  css: ['sass', 'shim']
};

var resultingTasks = [];

tasks.forEach(function(task){
  if(task in configTasks){
    configTasks[task].forEach(function(innerTask){
      if(innerTask in configTasks){
          configTasks[innerTask].forEach(function(reallyInnerTask){
            resultingTasks.push(reallyInnerTask);
          });
      }else{
          resultingTasks.push(innerTask);
      }
    });
  }else{
    resultingTasks.push(task);
  }
});

//sass,shim,js-lint,transform,compress,otherTask
console.log(resultingTasks);
```

Can you imagine if we add another additional level of deepness to our tasks object ?. Our code is slighty transformed into a wild juggernaut waiting to be unleashed and destroy everything in its path. That code would be too brittle and hard to maintain. In this case, the most elegant solution is to use a recursive function.

Check this

```javascript
var tasks = ['build', 'otherTask'];

var configTasks = {
  build: ['css', 'js', 'compress'],
  js: ['js-lint', 'transform'],
  css: ['sass', 'shim']
};

//our recursive function in conjunction with reduce method.
var recursive = function(config, tasks, allTasks){
  return tasks.reduce(function(acc, task){
    return task in config ? recursive(config, config[task], acc) : acc.concat(task);
  }, allTasks || []);
};

var resultingTasks = recursive(configTasks, tasks);
//sass, shim, js-lint, transform, compress, otherTask
console.log(resultingTasks);
```

With this, we can solve if we add other level of deep to our tasks object without have to refactor our code. Wonderful is it ?


## Curry

Curry is a simple technique: given a function with N parameters, it will return a function waiting until the rest of parameters be given.

To make an example of this, let's create a function that will add three numbers

```javascript
function add(a, b, c){
  return a + b + c;
}

//without curry
console.log(add(1, 2, 3)); //result = 6

//curried version
console.log(add(1)(2)(3)); //result = 6
```

Can you see the great difference here ?, the importance of curry is that allow us pass arguments step by step. That let us handle future values with already loaded values.

How can be done the same `add` function ?

```javascript
function add(a){
  return function(b){
    return function(c){
      return a + b + c;
    };
  };
}

console.log(add(1)(2)(3));//result = 6
```

A common practice to use with curry is to store known values and later apply them as we estimate convenient.

```javascript
function greeting(greetingType){
  return function(name){
    return greetingType + ' ' + name + ' !!!!';
  };
}

var bonjour = greeting('bonjour');
var hello = greeting('hello');
var ciao = greeting('ciao');

console.log(bonjour('jean'));//result = 'bonjour jean !!!!'
console.log(hello('steve'));//result = 'hello steve !!!!'
console.log(ciao('giancarlo'));//result = 'ciao giancarlo !!!!'
```

This example was done with a already curried greeting function. But how can I convert an uncurried function into a curried one ?. You can do it with several libraries like underscore, lodash or ramdba. This should look similar to this

```javascript
import _ from 'lodash';

var curriedSum = _.curry(function(a, b, c){
  return a + b + c;
});

var oneplustwo = curriedSum(1, 2);
var two = curriedSum(2);

console.log(curriedSum(1)(2)(3));
console.log(oneplustwo(3));
console.log(two(1, 3));
```

the inner implementation of curry might be like this

```javascript
function curry(fn){
  var length = fn.length;
  var slice = [].slice;

  var curried = function(){
    var args = slice.call(arguments);

    if(args.length < length){
      return function(){
        return curried.apply(null, args.concat(slice.call(arguments)));
      };
    }

    return fn.apply(null, args);
  };

  return curried;
}
```

## Compose

This is other useful technique commonly used in functional programming. This let us compose several smaller functions into a bigger one. Let check this:

```javascript
function exclaim(str){
  return str + '!';
}

function toUpperCase(str){
  return str.toUpperCase();
}

function shoutLoud(str){
  return exclaim(toUpperCase(str));
}

console.log(shoutLoud('here is my old sport charles'));
```

as you can see **shoudLoud** function is a composition of exclaim and toUpperCase, in the case if we want to add some additional behavior, we simply put inside our function like this:

```javascript
function toL33tLanguage(str){
  return str
    .replace(/a/gi, '4')
    .replace(/e/gi, '3')
    .replace(/i/gi, '1')
    .replace(/t/gi, '7')
    .replace(/o/gi, '0')
    .replace(/s/gi, '5');
}

function exclaim(str){
  return str + '!';
}

function toUpperCase(str){
  return str.toUpperCase();
}

function shoutLoud(str){
  return toL33tLanguage(exclaim(toUpperCase(str)));
}

console.log(shoutLoud('here is my old sport charles'));
```

As function is composed for more functions, you can see how it becomes less readable because of nested called functions.

To get rid of this we can use compose function as follows:

```javascript
var shoudLoud = compose(toL33tLanguage, exclaim, toUpperCase);
//in background it will do the same toL33tLanguage(exclaim(toUpperCase(value)));
//in lodash is named "flowRight" instead of compose
```

This is just too useful when we want to create composite functions made by several bug-free simple and pure functions.

How compose is working in background ? you can look this code:

```javascript
function compose() {
  var funcs = arguments,
      length = funcs.length;

  return function() {
    var idx = length - 1,
        result = funcs[idx].apply(this, arguments);

    while (idx--) {
      result = funcs[idx].call(this, result);
    }

    return result;
  };
}
```

## Point free programming

Pointfree style means never having to say your data. Excuse me. It means functions that never mention the data upon which they operate. First class functions, currying, and composition all play well together to create this style.

Just to make an example of this we can see the code below

```javascript
var _ = require('lodash');

function replace(match, replacement){
  return function(str){
    return str.replace(match, replacement);
  };
}

function toLowerCase(str){
  return str.toLowerCase();
}

//NOT POINTFREE BECAUSE WE MENTION THE DATA: WORD
var snakeCase = function (word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};

console.log(snakeCase('yo dude, how have you been ?'));

//POINTFREE
var pointFreeSnakeCase = _.flowRight(replace(/\s+/ig, '_'), toLowerCase);
console.log(pointFreeSnakeCase('yo dude, how have you been ?'));
```

Now, we will convert a completely pointy imperative function to a point-free composable function to see what I am talking about.

```javascript
//users for demo purposes
var users = [
  { role:'admin', email: 'admin1@mailinator.com' },
  { role:'dba', email: 'dba@mailinator.com' },
  { role:'designer', email: 'designer@mailinator.com' },
  { role:'admin', email: 'admin2@mailinator.com' },
  { role:'developer', email: 'developer@mailinator.com' },
  { role:'pmo', email: 'pmo@mailinator.com' }
];

//imperative function
var getAdminEmails = function(users) {
  var emails = [];

  for (var i = 0; i < users.length; i++) {
    if (users[i].role === 'admin') {
      emails.push(users[i].email);
    }
  }

  return emails;
};

//first step is to change our resulting list in a new array of emails from admins
var adminEmails = users
  .filter(function(user){ return user.role === 'admin'; })
  .map(function(user){ return user.email; });

//now we have identified what portions of code can be refactored to a point-free version

//how to convert it in a point-free version
var getAdminEmails = compose(getEmails, onlyAdmins);
```

So, how must be implemented `getEmails` and `onlyAdmins` ? We need first to implement two functions we are going to need, these are map and filter functions:

```javascript
//this is ES6 fat arrow functions, in ES5 code is the same as
//var map = function(fn){ return function(list){ return list.map(fn); } };
var map = fn => list => list.map(fn);
//same explain as map
var filter = fn => list => list.filter(fn);
```

The next task we need to do is to create getEmails and prop functions:

```javascript
var prop = p => obj => obj[p];
var getEmails = map(prop('email'));
```

With this, we can get email property from a object list. Now, we need to implement onlyAdmin function

```javascript
/*
  1.- v -> we receive what value should our property should be
  2.- p -> the property we will look to take from object
  3.- obj -> our object to get property value
*/
var propIsEqual = v => p => obj => prop(p)(obj) === v;

//we filter the users that does not have the admin role
var onlyAdmins = filter(propIsEqual('admin')('role'));
```

Finally, all the code we have done should look like this:

```javascript
'use strict';
var _ = require('lodash');

var users = [
  {role:'admin', email: 'admin1@mailinator.com'},
  {role:'dba', email: 'dba@mailinator.com'},
  {role:'designer', email: 'designer@mailinator.com'},
  {role:'admin', email: 'admin2@mailinator.com'},
  {role:'developer', email: 'developer@mailinator.com'},
  {role:'pmo', email: 'pmo@mailinator.com'}
];

//imperative function
var getAdminEmails = function(users) {
  var emails = [];

  for (var i = 0; i < users.length; i++) {
    if (users[i].role === 'admin') {
      emails.push(users[i].email);
    }
  }

  return emails;
};

console.log('imperative way', getAdminEmails(users));

//first step is to change our resulting list in a new array of emails from admins
//in this case we are getting pointy functions yet
var adminEmails = users
  .filter(user => user.role === 'admin')
  .map(user => user.email);

console.log('functional first step', adminEmails);

var filter = fn => list => list.filter(fn);

var map = fn => list => list.map(fn);

//to get the property of an object
var prop = p => obj => obj[p];

/*
  1.- v -> we receive what value should our property should be
  2.- p -> the property we will look to take from object
  3.- obj -> our object to get property value
*/
var propIsEqual = v => p => obj => prop(p)(obj) === v;

//we get the email property of an object with email property
var getEmails = map(prop('email'));

//we filter the users that does not have the admin role
var onlyAdmins = filter(propIsEqual('admin')('role'));

//now we have identified what portions of code can be refactored to a point-free version
//how to convert it in a point-free version
var pointFreeGetAdminEmails = _.flowRight(getEmails, onlyAdmins);

//check if our point free version is returning the same results
console.log('point free result', pointFreeGetAdminEmails(users));
```

Notice here that `pointFreeGetAdminEmails` `getEmails` and `onlyAdmins` are point-free functions and are concise enough. However, one downside of this approach is that requires a deeper understanding of functional programming.

I have shown you this approach because in some cases a generic approach is the right way to solve a problem. In other cases, it obscures too much your code. It could be a little scary to new team members to get immediately what is going on in your code.

So my advice here is, whenever you can create a generic function, try to make it point-free, otherwise make it simple and let it be pointy.


## Functors

We have seen how to abstract behavior with pure functions. Now, how we deal with all the side-effects(asynchronous task, error handling, etc) in real world in functional programming ?.

Let me introduce you Containers first we can get further.

```javascript
function Container(value){
  return {
    val: function(){
      return value;
    }
  };
}
```

It can hold anything and we are hiding it from outside, if we need to retrieve current value, we must call the **val** method

```javascript
var myValue = Container(2);
console.log(myValue);
```

Now, what if we want to work with this value ? we do not want to just retrieve from its container to just modify it and them create other container.

For this case we are going to implement map to transform our value to something else

```javascript
function Container(value){
  return {
    __val: value,
    map: function(transform){
      return Container(transform(value));
    }
  };
}
```

With this **map** function we can transform our value into something else without leaving our container.

```javascript
'use strict';

function Container(value){
  return {
    __val: value,
    map: function(transformer){
      return Container(transformer(value));
    }
  };
}

var myValue = Container(2);
console.log(myValue);
console.log(myValue.__val);

var otherValue = myValue
  .map(function(v){ return v * 2; })
  .map(function(v){ return v + ' times!'; });

console.log('my value val', myValue.__val);
console.log('other value val', otherValue.__val);
```

As you can see, this is what we name as 'Functors'

> In essence, a functor is nothing more than a type that implements a mapping function with the purpose of lifting values into a container.

## Monads

According to wikipedia, monads:

> In functional programming, a monad is a structure that represents computations defined as sequences of steps: a type with a monad structure defines what it means to chain operations, or nest functions of that type together. This allows the programmer to build pipelines that process data in a series of steps (also called actions), in which each action is decorated with additional processing rules provided by the monad.

Well, for us could be easier to understand all that definition to this:

> Monads are data types similar to functors, but they also define the rules by which values are contained within them. The monad type, as such, is an abstract data type with the following interface

| INTERFACE | DESCRIPTION |
| --------- | ----------- |
| Type constructor | Used for creating monadic types |
| Unit function | Used for inserting a value into a monadic structure. Typically called of or fromNullable |
| Bind function | Used for chaining operations on monadic values, called map |
| Join operation | Used to flatten layers of monadic structures into one. Important when used in the composition of functions that return monadic types |

So, what they can offer us ?. In essence, we can wrap a value into a container and make operations to it without the need of leaving this container. Let's check a bunch of useful monads

- Maybe
- Either
- IO/Monad

### Maybe

The Maybe monad can be used to model the presence or absence of a value (null or undefined) in a centralized and secure manner.

How can we implement it in a naive way ?

```javascript
function Maybe(value){
  return {
    isNull: function(){
      return value == null;
    },
    map: function(transform){
      return this.isNull() ? Maybe(null) : Maybe(transform(value));
    }
  };
}
```

So, what can offer this new tool for us ? let's see with this example:

```javascript
var person1 = {
  name: 'Ryan',
  sport: 'soccer',
  address: {
    place: '5th avennue',
    country: 'USA'
  }
};

var person2 = {
  name: 'michelle',
  sport: 'basketball',
  address: null
};

console.log('person 1 country',person1.address.country);// output person 1 country USA
console.log('person 2 country', person2.address.country);// TypeError: Cannot read property 'country' of null
```

If you can notice here we are getting an error to deal with, so the common choice to resolve this is something like :

```javascript
function getCountry(person){
  if(person && person.address && person.address.country){
    return person.address.country;
  }else{
    return null;
  }
}

var person1 = {
  name: 'Ryan',
  sport: 'soccer',
  address: {
    place: '5th avennue',
    country: 'USA'
  }
};

var person2 = {
  name: 'michelle',
  sport: 'basketball',
  address: null
};

console.log('person 1 country', getCountry(person1));// output person 1 country USA
console.log('person 2 country', getCountry(person2));// null
```

What about that constant check validation around to get country property ? We can solve that with **Maybe** monad.

```javascript
'use strict';

function Maybe(value){
  return {
    val: function(defaultValue){
      return this.isNull() ? defaultValue || null : value;
    },
    map: function(transform){
      return this.isNull() ? Maybe(null) : Maybe(transform(value));
    },
    isNull: function(){
      return value == null;
    }
  };
}

function prop(p){
  return function(o){
    return o[p];
  };
}

function getCountry(person){
  return Maybe(person)
  .map(prop('address'))
  .map(prop('country'))
  .val('Sorry, but you do not have your country specified');
}

var person1 = {
  name: 'Ryan',
  sport: 'soccer',
  address: {
    place: '5th avennue',
    country: 'USA'
  }
};

var person2 = {
  name: 'michelle',
  sport: 'basketball',
  address: null
};

console.log('person 1 country:', getCountry(person1));
console.log('person 2 country:', getCountry(person2));
```

Notice our application now does not crash when we access undefined values. We let Maybe take care of that each time we try to apply a transform function in our **Maybe Monad**.

Other important monad that is very popular right now is the Promise monad(Yup, Promise is a monad). It implements `flatMap` as `then` method. What's important in promises ? Well, you can abstract your work to process your data flow without worrying in what steps are required to accomplish that. Also, you have a wrapper that allow you to work with your data seamlessly and when is available it will trigger all the listeners. To check more about promises, check why promise is a monad for asynchronous programming [link][promise-monad-source]

Furthermore, if you want to know more about monads in javascript you can check this video where douglas crockford talks about monads here [douglas crockford monads][douglas-crockford-monad]

[back to previous page](../README.md#functional-programming)
[promise-monad-source]:https://blog.jcoglan.com/2011/03/11/promises-are-the-monad-of-asynchronous-programming/
[douglas-crockford-monad]:https://www.youtube.com/watch?v=dkZFtimgAcM
