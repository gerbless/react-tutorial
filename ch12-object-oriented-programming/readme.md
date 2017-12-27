# Object Oriented Programming in Javascript


1. [What is Object Oriented Programming](#what-is-object-oriented-programming)
    - [Encapsulation](#encapsulation)
    - [Inheritance](#inheritance)
    - [Polymorphism](#polymorphism)
2. [Objects in Javascript](#objects-in-javascript)
    1. [Prototypes in javascript](#prototypes-in-javascript)
    2. [Object creation modes](#object-creation-modes)
        - [Constructor functions](#constructor-functions)
        - [Factory functions](#factory-functions)
        - [Object cloning](#object-cloning)
        - [Concatenative Inheritance](#concatenative-inheritance)


## What is Object Oriented Programming

First, we may look what object oriented programming is according to wikipedia

> Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects", which may contain data, in the form of fields, often known as attributes; and code, in the form of procedures, often known as methods. A distinguishing feature of objects is that an object's procedures can access and often modify the data fields of the object with which they are associated (objects have a notion of "this" or "self"). In OO programming, computer programs are designed by making them out of objects that interact with one another. There is significant diversity in object-oriented programming, but most popular languages are class-based, meaning that objects are instances of classes, which typically also determines their type.

What is important in object oriented programming ? Well, we can do a lot code reuse for our own needs. We can abstract any idea or stuff from the real world to our code. Think about a car, can you describe it ?

- It has 4 wheels.
- I can be brown, blue, red, green, etc.
- It has a steering wheel.
- It has an engine.
- etc.

All of these characteristics is what identifies a car. Also, in this car idea you can do certain things with this car. You can make a trip in it or maybe go to the job.

So, objects in the simplest thing is a data container with behavior related to that data. That's all

There are many important things about this paradigm, but I want to mention three of them:

- Encapsulation
- Inheritance
- Polymorphism

Each of these will be explained below

### Encapsulation

All your objects should work as expected, but you do not have to know how
it works in the background. All this functionality and inner working to make things happen
must be hidden to outsiders.

E.g. Think in a regular engine. You use it in a car, but you don't know how it really works. The most interesting part about this is you use it seamlessly, you know what it does and it works perfectly, you don't care about how all the machinery is working in the background.

That is encapsulation.


### Inheritance

What happens when you want to make to objects that have properties and behavior in common ? Do you have to duplicate code to achieve that ?. Oh no my friend, you can do an inheritance. Similar to proper genetic inheritance(like we inherit characteristics from our parents) we can inherit properties and behaviors from one class to another.

The class that inherits properties and behavior is commonly known as child class and the class that is inherited is known as parent class or base class.

Let's suppose we have a dog class and a cat class, what they have in common ?:

- they have 4 legs
- they have fur
- they have a tail
- they run crazily

for this case, we could have a common class named Animal that dogs and cats can inherit from it to get all the characteristics that Animal class have.


### Polymorphism

If you are a Child class you can act like your parent class. That's important because you as a subclass can implement specific behavior that your parent component does not. This is really useful when you want to declare generic classes to operate with your data. With Polymorphism you can extend or implement implementation detail with your child class and behave like its parent class.

Following the previous example with cats and dogs, let's suppose we have a function that needs to receive an animal. We know with inheritance, cats and dogs are child classes from animal class, so they can behave just like this animal class.

This is known as polymorphism, child classes can act like their parent classes.


## Objects in Javascript

Objects in Javascript are a lot different from classical languages like Java.

Classical Object system in languages like Java is like creating a blueprint. Each time you create an instance from this class you are practically copying all the properties and methods from the blueprint to your new object.

Let me apologize for all OOP hackers, I am sure they are mad at me right now, because I have give you a naive and maybe inaccurate version of what traditional OOP is. Probably is a naive explanation about what happens in the simplest way I can explain.

Furthermore, when we are extending a parent class, we are copying all the properties from that class into ours. Then, when we are creating a new instance from that child class we inherit all the properties from child class.

This picture can be used to make a better explanation what I am trying to say.

![classical-inheritance][classical-inheritance-source]


Object prototypes in Javascript are different citizens. We are using objects directly and if we have not a property ourselves but if our "parent" does, we can do a lookup to that parent class and use it as is was ours.

So, instead of copying all the properties to one object to another, we send a list of "shortcuts" which that child object can use for its needs.

This is better explained in the picture below:

![prototypal-inheritance][prototypal-inheritance-source]


This is usually a way to represent class inheritance in Javascript like the other languages do:

```javascript
function Foo(who){
  this.me = who;
}

Foo.prototype.identify = function(){
  return "I am " + this.me;
};

function Bar(who){
  Foo.call(this, who);
}

Bar.prototype = Object.create(Foo.prototype);
Bar.ptototype.constructor = Bar;

Bar.prototype.speak = function(){
  console.log("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak(); // Hello, I am b1.
b2.speak(); // Hello, I am b2.
```

For this classical inheritance way to do things like other languages do, this diagram is a practical and naive representation what is happening in the background:

![classical-diagram][classical-diagram-source]


Now, lets forget all this ..... garbage found in misconceptions about how Javascript objects should work. Let's try to refactor this mess with something more clean and tidy:

```javascript
var Foo = {
  init: function(who){
    this.me = who;
  },
  identify: function(){
    return "Hi I am " + this.me;
  }
};

var Bar = Object.create(Foo);
Bar.speak = function(){
  console.log("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");

var b2 = Object.create(Bar);
b2.init("b2");

b1.speak();// Hello, I am b1.
b2.speak();// Hello, I am b2.
```

![prototypal-diagram][prototypal-diagram-source]

That's a lot nicer, do you think that too ?. I know, you are not accustomed to this way of do objects and inherit from them. So we will study the many ways you can do object inheritance and object creation in Javascript.


## Object creation modes

- Constructor functions
- Factory functions
- Object delegation
- Concatenative Inheritance


### Constructor functions

This is the most similar way to create objects in other languages.

```javascript
function Person(name, surname){
  this.name = name;
  this.surname = surname;
}

User.prototype.sayHello = function(){
  console.log('hi, my name is ' + this.name + ' and my surname is ' + this.surname);
};

var personInstance = new Person('douglas', 'crockford');
personInstance.sayHello();
```

### Factory functions

This way is the most flexible way to create objects in Javascript. It's the second most used way to create objects in Javascript(first one is object literals).

```javascript
function person(name, surname){
  var obj = {
    name: name,
    surname: surname,
    sayHello: function(){
      console.log('hi, my name is ' + this.name + ' and my surname is ' + this.surname);
    }
  };

  return obj;
}

var personInstance = person('douglas', 'crockford');
personInstance.sayHello();
```

### Object cloning

There is a third one way to create objects. This one is creating a clone of an exemplar Object(similar to parent class).

```javascript
var person = {
  name: 'douglas',
  surname: 'crockford',
  sayHello: function(){
    console.log('hi, my name is ' + this.name + ' and my surname is ' + this.surname);
  }
};

var personInstance = Object.create(person);
personInstance.sayHello();


//under the hoods, this is the naive way how objects with Object.create create new instances
Object.create = function(obj){
  var F = function(){};
  f.prototype = obj;
  return new F();
};
```


### Concatenative Inheritance

One good way to do object inheritance is via Object composition(like GoF recommend us). Due to Javascript ability to do dynamic object extension in runtime.

These technique has some alias:

- Concatenative inheritance, aka mixins
- Composition


```javascript

//just for demo purpose, usually Object.assign is implemented in modern browsers
//but if your browser does not support it, this is a naive implementation of object assign
//to make things work
Object.assign = Object.assign || function(target){
  var sources = [].slice.call(arguments, 1);

  sources.forEach(function(source){
    Object.keys(source).forEach(function(key){
      target[key] = source[key];
    });
  });

  return target;
};

var ninja = {
  shurikens: 10,
  ninjutsu: true,
  makeNinjaMove: function(){
    console.log('kyaaaaa, i am throwing you ' + this.shurikens + ' shurikens');
  }
};

var pirate = {
  laughType: 'harharhar',
  bottlesOfRum: 5,
  greeting: function(){
    console.log('hi i am a pirate, nice to meet you ' + this.laughType);
  },
  drinkBottle: function(){
    if(this.bottlesOfRum){
      this.bottlesOfRum--;
      console.log('i have drink 1 bottle of rum now i have' + (this.bottlesOfRum));
    }else{
      console.log("i don't have any rum to drink :(");
    }
  }
};

var zombie = {
  shout: function(){
    console.log('braaaaiiiinns!');
  }
};

var robot = {
  lasers: true,
  ramAvailable: "4GB",
  computeSomething: function(){
    console.log('I am computing something, beep boop');
  }
};

//instead of just creating hierarchical structures and brittle to changes classes
//we can just create an horizontal hierarchy where you are as flexible as possible
var ninjaPirateZombieRobot = Object.assign({}, ninja, pirate, zombie, robot);
console.log(ninjaPirateZombieRobot);//this object can act like all of those other objects.
```

[back to previous page](../README.md#object-oriented-programming)


[inherited-a-mess]:https://davidwalsh.name/javascript-objects
[classical-inheritance-source]:https://davidwalsh.name/demo/InheritanceArrows.png
[prototypal-inheritance-source]:https://dl.dropboxusercontent.com/u/2474669/jsdiagrams/DelegationArrows.png
[classical-diagram-source]:https://davidwalsh.name/demo/JavaScriptObjects--Full.png
[prototypal-diagram-source]:https://davidwalsh.name/demo/JavaScriptObjects--OnlyObjects.png
