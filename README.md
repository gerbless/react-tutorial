# ReactJS Tutorial

1. [ES2015 Syntax](#es2015-syntax)
1. [What is React](#what-is-react)
1. [Preparing the Environment](#preparing-the-environment)
1. [Environment description](#environment-description)
1. [My first component](#my-first-component)
1. [Thinking in components](#thinking-in-components)
1. [Props and States](#props-and-states)
1. [Event handling](#event-handling)
1. [Modules](#modules)
1. [Real example](#real-example)
1. [Stateful stateless components](#stateful-stateles-components)
1. [Component Lifecycle methods](#component-lifecycle-methods)
1. [Flux vs MVC](#flux-vs-mvc)
1. [Modules](#modules)
1. [Gulp](#gulp)
1. [CSS Preprocessors](#css-preprocessors)
1. [Unit tests](#unit-tests)
1. [Functional programming](#functional-programming)
1. [Object Oriented Programming](#object-oriented-programming)


## ES2015 Syntax

All the examples shown here are written using the new ES6/ES2015 syntax, if you need more info about this, please visit
[ES6/ES2015][es-syntax-source]


## What is React

ReactJS is a Javascript library created by facebook. It is used to create UI components for a web application.
A calendar, a slider, a countdown timer, all these examples can be done via ReactJS.

## Preparing the Environment

For this tutorial and for most use cases, I recommend you Atom or VSCode, which are good options to code with React and javascript in general. You can download them in the links below:

- https://atom.io/
- https://code.visualstudio.com/

Also, we will do all these examples in google chrome and react developer tools extension, you can found it right here
[Chrome React developer tools][react-developer-tools]

To use ReactJS, the first thing we will do is download nodeJS, the link to download it is right here [NodeJS][node-js-source]

Then we need to install node in our PC, if you have done that already, please take the terminal prompt to check it (the version should be greater now):

```shell
$ node --version
$ v8.2.1
```

The next step is to create all the environment we will use, so to prepare it, please download this script to create all the necessary dependencies: [LINK][react-essential-setup-source]

we can run this code just typing in terminal(after downloading file and moving it with ourselves into the directory folder)

```shell
$ node boot.js
```

This will download all the project dependencies needed by this tutorial. Once finished, the project structure will be similar to this

![foo][screen01]


## Environment description

To work with ReactJS from scratch is not as simple as using jQuery, because we need a couple of tools to transform our code into something useful to the browsers. These tools are listed and described below:

- **Babel**: It is a compiling tool that allow us to use latest features of Javascript and compiles it to proper ES5 code, also transform JSX code into regular javascript.
- **Webpack**: This is a module bundler, it allows us to split our code in many files, keeping our code tidy. Also it does additional things besides this, but for now it's more than enough.
- **Webpack Plugins**: A couple of plugins to work with the code, if we need to use them we will configure them later ;).


## My first component

Before creating our first React component we should run our development server. To do that, we must run the following command

```shell
$ npm run start
```

This will start our services to work with, then we can view our server in http://localhost:1337

Then, inside src/index.jsx we will find written this:

```javascript
console.log('hello world');
```

Now that we have already located the file which is going to be our place to work with, then we can create our first react application.


```javascript
// with this we can import React to use it
import React from 'react';
// this lib is needed to place our React App into the HTML
import ReactDOM from 'react-dom';

// this is the minimal example
class App extends React.Component {
  render() {
    return (<p>Hello world</p>);
  }
}

// Also it can be written in this way. However this way is going to be taught later in stateful stateless components.
// const App = () => <p>Hello world</p>;

// this is responsible write it on the DOM.
ReactDOM.render(<App />, document.querySelector('#app'));
```

Now, this example should look like below:


![screen][screen02]

If you have installed react developer tools, you should see these properties in that tab

![screen][screen03]

As you can see, there is not something so different than any other code which we can write ourselves directly.


## Thinking in components

One of main purposes of ReactJS is to split HTML into many reusable components. So for the next exercise, we will follow this principle.

We will create an user profile and we need this requirements to accomplish.

- [x] User Name
- [x] User Role
- [x] User Salary
- [x] User Avatar
- [x] User Biography

We could do this just writing one React component, but as mentioned before, we should split all this HTML code into multiple React components. So let's start

First, we will create an user profile component

```javascript
//this is our draft to begin to work with
class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            our avatar will be here
          </div>
          <div className="UserProfile-container">
            user data will be here
          </div>
        </div>
        <div>description will be here</div>
      </article>
    );
  }
}
```

With this, our component will have all the necessary stuff to accomplish our requirements. If you notice here, to assign CSS classes to a React component, you should assign them in className attribute. This is because `class` keyword is a reserved word in Javascript.

The next step is create an user avatar component

```javascript
class UserAvatar extends React.Component {
  render() {
    return <img src="http://placehold.it/350.jpeg&text=Kermit+the+frog+token" />;
  }
}
```

Also, we need another component to keep our data, this will be named UserData.

```javascript
class UserData extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>Kermit the frog</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>CEO</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>$ 250,000 USD per year</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
```

Now, we can replace placeholder mocks in our first user profile component

```javascript
class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            {/* this is where we are putting the UserAvatar component we have just created */}
            <UserAvatar />
          </div>
          <div className="UserProfile-container">
            {/* this is where we are putting the UserData component we have just created */}
            <UserData />
          </div>
        </div>
        <div>This is kermit, our CEO of ....</div>
      </article>
    );
  }
}
```

The, we can refactor the former code inside ExampleApp Component with this unique component

```javascript
class ExampleApp extends React.Component {
  render() {
    return <UserProfile />;
  }
}
```

Finally, our complete example for the code is going to be similar to this

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class UserAvatar extends React.Component {
  render() {
    return (
      <img src="http://placehold.it/350.jpeg&text=Kermit+the+frog+token" />
    );
  }
}

class UserData extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>Kermit the frog</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>CEO</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>$ 250,000 USD per year</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class UserProfile extends React.Component {
  render(){
    return (
      <article className="user-profile">
        <h3>User Profile</h3>
        <div>
          <div className="user-profile__section">
            <UserAvatar />
          </div>
          <div className="user-profile__section">
            <UserData />
          </div>
        </div>
        <div>This is kermit, our CEO of ....</div>
      </article>
    );
  }
}

class ExampleApp extends React.Component {
  render() {
    return <UserProfile />;
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('app'));

```

```css
.user-profile {
  width: 50%;
  margin: auto;
}

.user-profile__section {
  display: inline-block;
  vertical-align: top;
}
```

now, save this file as main.css under project folder. We only need to add it within index.html

```html
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <title>React example</title>
  <link rel="stylesheet" href="main.css" />
  <script src="main.bundle.js" defer></script>
</head>
```

Now, with the CSS created, this former example should look as below

![component][screen04]

The HTML code in chrome should be similar to this too

![html][screen05]

The most important thing here, is to keep our components as small as possible. With this in mind, we can reuse them anywhere we want.


## Props and states

[Props and states](props-and-states/readme.md)


## Event handling

[Event handling](event-handling/readme.md)


## Modules

[Modules](modules/readme.md)


## Real example

[Real example](real-example/readme.md)


## Stateful stateless components

Coming soon...

## Component lifecycle methods

Coming soon...


## Flux vs MVC

[Flux vs MVC](flux/readme.md)


## GULP

[Gulp](gulp/readme.md)


## CSS Preprocessors

[CSS Preprocessors](css-preprocessors/readme.md)


## Unit tests

[Unit tests](unit-tests/readme.md)


## Functional programming

[Functional programming](functional-programming/readme.md)


## Object oriented programming

[Object Oriented Programming](object-oriented-programming/readme.md)


[es-syntax-source]:http://es6-features.org/#Constants
[react-developer-tools]:https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=chrome-app-launcher-info-dialog
[node-js-source]:https://nodejs.org/en/download/
[react-essential-setup-source]:boot.js
[screen01]:images/sc-001.png
[screen02]:images/sc-002.png
[screen03]:images/sc-003.png
[screen04]:images/sc-004.png
[screen05]:images/sc-005.png
