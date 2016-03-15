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


## What is Object Oriented Programming

First, we may look what object oriented programming is according to wikipedia

> Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects", which may contain data, in the form of fields, often known as attributes; and code, in the form of procedures, often known as methods. A distinguishing feature of objects is that an object's procedures can access and often modify the data fields of the object with which they are associated (objects have a notion of "this" or "self"). In OO programming, computer programs are designed by making them out of objects that interact with one another. There is significant diversity in object-oriented programming, but most popular languages are class-based, meaning that objects are instances of classes, which typically also determines their type.

What is important in object oriented programming ? Well, we can do a lot code reuse for our own needs.

There are many important things about this paradigm, but I want to mention three of them:

- Encapsulation
- Inheritance
- Polymorphism

Each of these will be explained below


### Encapsulation

All your objects should work as expected, but you do not have to know how
it works in the background. All this functionality and inner working to make things happen
must be hidden to outsiders.

### Inheritance

What happens when you want to make to objects that have properties and behavior in common ? Do you have to duplicate code to achieve that ?. Oh no my friend, you can do an inheritance. Similar to proper genetic inheritance(like we inherit from our parents) we can inherit properties and behaviors.

The class that inherits properties and behavior is commonly known as child class and the class that is inherited is known as parent class or base class.

### Polymorphism

If you are a Child class you can act like your parent class. That's important because you as a subclass can implement specific behavior that your parent component does not. This is really useful when you want to declare generic classes to operate with your data. With Polymorphism you can extend or implement implementation detail with your child class and behave like its parent class.


## Objects in Javascript

Objects in Javascript are a lot different from classical languages like Java. These

Classical Object system in languages like Java
![classical-inheritance][classical-inheritance-source]

Object prototypes in Javascript
![prototypal-inheritance][prototypal-inheritance-source]


## Object creation modes

- Constructor functions
- Factory functions
- Object delegation

### Constructor functions

This is the most similar way to create objects in other languages.

````javascript
function Person(name, surname){
  this.name = name;
  this.surname = surname;
}

User.prototype.sayHello = function(){
  console.log('hi, my name is ' + this.name + ' and my surname is ' + this.surname);
};

var personInstance = new Person('douglas', 'crockford');
personInstance.sayHello();
````

### Factory functions

This way is the most flexible way to create objects in Javascript. It's the second most used way to create objects in javascript(first one is object literals).

````javascript
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
````

### Object cloning

There is a third one way to create objects. This one is creating a clone of an exemplar Object(similar to parent class).

````javascript
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
````

[inherited-a-mess]:https://davidwalsh.name/javascript-objects
[classical-inheritance-source]:https://davidwalsh.name/demo/InheritanceArrows.png
[prototypal-inheritance-source]:https://dl.dropboxusercontent.com/u/2474669/jsdiagrams/DelegationArrows.png
