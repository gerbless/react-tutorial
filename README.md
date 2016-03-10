# React Tutorial

1. [ES2015 Syntax](#es2015-syntax)
2. [What is React](#what-is-react)
3. [Pros vs Cons](#pros-vs-cons)
4. [Preparing the Environment](#preparing-the-environment)
5. [Environment description](#environment-description)
6. [My first component](#my-first-component)
7. [Thinking in components](#thinking-in-components)
8. [Props and States](#props-and-states)
9. [Event handling](#event-handling)
10. [Modules](#modules)
11. [Real example](#real-example)
12. [Flux vs MVC](#flux-vs-mvc)
    1. [MVC](#mvc)
    2. [Flux](#flux)
13. [Flux implementation by Facebook](#flux-implementation-by-facebook)
14. [Flux implementation by Redux](#flux-implementation-by-redux)
15. [Browserify and Webpack](#browserify-and-webpack)
16. [Gulp](#gulp)
    1. [What is gulp](#what-is-gulp)
    2. [Task creation](#task-creation)
    3. [The Default task](#the-default-task)
    4. [Tasks in watch mode](#tasks-in-watch-mode)
    5. [Real example with GULP](#real-example-with-gulp)
    6. [Gulp with browserify](#gulp-with-browserify)
    7. [Gulp with webpack](#gulp-with-webpack)
17. [CSS Preprocessors](#css-preprocessors)
    1. [Sass vs Less vs Stylus](#sass-vs-less-vs-stylus)
    2. [Practical use](#practical-use)
    3. [Gulp configuration](#gulp-configuration)
18. [Unit tests](#unit-tests)
    1. [What are unit tests](#what-are-unit-tests)
    2. [Tape vs Mocha](#tape-vs-mocha)
    3. [My first unit test](#my-first-unit-test)
19. [Functional programming](functional-programming)
20. [Object Oriented Programming](object-oriented-programming)


## ES2015 Syntax

All the examples shown here are written using the new ES6/ES2015 syntax, if you need more info about this, please visit
[ES6/ES2015][es-syntax-source]


## What is React

ReactJS is a javascript library created by facebook. It is used to create UI components for a web application.
A calendar, a slider, a countdown timer, all these examples can be done via ReactJS.

## Pros vs Cons

All technologies have pros and cons, react is not an exception, so you must know what are they:

- **Pros**
    - It is just a library, not a framework, so it is easier to learn than other javascript approaches.
    - Fixing bugs is easier than you thought.
    - It can be easily integrated with other libraries such as jQuery, Bootstrap, moment, Lodash, etc.
    - You do not need to make changes in your HTML code, react does the heavy lift for you.
- **Cons**
    - It requires a deeper javascript understanding.
    - The ReactJS ecosystem is not as easy to install as jQuery.
    - It can be haunting at first sight.
    - It is need to compile React applications.
    - You must use the command line tool.

## Preparing the Environment

For this tutorial, and for most use cases, I recommend you Atom, which is the text editor created by github staff, to download it you can visit https://atom.io/

Also, we will do all these examples in google chrome and react developer tools extension, you can found it right here
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=chrome-app-launcher-info-dialog

To use react, the first thing we will do is download nodeJS, the link to download it is right here [NodeJS][node-js-source]

Then we need to install node in our PC, if you have done that already, please take the terminal prompt to check it:

````shell
$ node --version
$ v5.3.0
````

This should appear in response to your command, the version number might be a little different, but that is fine.
The next step is to create all the environment we will use, so to prepare it, please download this script to create all the necessary dependencies: [LINK][react-essential-setup-source] (this script has to be run within unix terminal like osx or linux)

**NOTE** This script only works within Linux and OSX environments, if you need this script can be run under windows, please download GIT for windows from https://git-scm.com/downloads . This will create a mini unix environment to work with GIT and some unix commands

we can run this code just typing in terminal(after decompressing the file and moving ourselves into the directory folder)

````shell
$ sh startup.sh
````

This will download all the project dependencies needed by this tutorial. Once finished, the project structure will be similar to this

![foo][screen01]


## Environment description

To work with ReactJS is not as easy as jQuery, because we need some tools to do some special things, each of these tools will be described

- **Babel** It is a compiling tool that allow us to use latest features of Javascript in older environment.
- **Webpack / Browserify** These tools are module bundlers, they allow us to split our code in many files, keeping our code tidy. Then they will join all these files and compress in just 1 file.
- **JSX** JSX is a special syntax that help us to create HTML markup inside javascript code.
- **Gulp** This is a tool that allow us to automate repetitive task such as compressing images, CSS preprocessing, linting javascript code, etc.


## My first component

Before creating our first React component we should run our development server. To do that, we must run the following command

````shell
$ npm run start
````

This will start our services to work with, then we can view our server in http://localhost:3000

Then, we will replace the content inside main.js

````javascript
console.log('this is my 1st file');
````

for this one

````javascript
//react library to create react component
import React from 'react';

//react library that render our react components somewhere in DOM tree
import ReactDOM from 'react-dom';
````

This allow us import React and ReactDOM modules to use them in our app, what means modules and similar is explained in module section later.

Then, we can create our first react component in this way

````javascript
class ExampleApp extends React.Component {

}
````

The only function needed inside this component is the render method, which is responsible to declare HTML markup and return it. With this in mind we can create some HTML markup.

````javascript
render(){
  //Yup, this is weird, however we can create HTML markup directly in Javascript code
  //this is called JSX syntax and it differs a little with HTML(but no too much)
  return <div>This is my first React Component</div>;
}
````

As you can see, we can define HTML markup inside javascript code. Do not worry, Babel(our transpiler) will transform this HTML into traditional javascript code ;).

To attach this component in our DOM we need this line to achieve this

````javascript
/*
  - the first sent argument, is our react component we want to render in DOM.
  - the second one, is the HTML node which will be our host element to render the react component.
*/
ReactDOM.render(<ExampleApp />, document.getElementById('example'));
````

Finally, our first example will be similar to this

````javascript
import React from 'react';
import ReactDOM from 'react-dom';

class ExampleApp extends React.Component {
  render() {
    return <div>This is my first react component</div>;
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('example'));

````

This is our first React component, this should be similar to this in your screen

![screen][screen12]

If you have installed react developer tools, you should see in it something like this

![screen][screen13]

If you noticed in HTML example, an important thing to highlight is the following code

````html
<div data-reactid=".0">This is my first react component</div>
````

The `data-reactid=.0` attribute is for internal use, React uses it to identify this element as a react component. This one must be a readonly attribute to us.

## Thinking in components

One of main purposes of react is to split HTML into many reusable components. So for the next exercise, we will follow this principle.

We will create an user profile with username kermit and we need this requeriments to accomplish.

- [x] User Name
- [x] User Role
- [x] User Salary
- [x] User Avatar
- [x] User Biography

We could do this just writing one react component, but as mentioned before, we should split all this into multiple react components. So let gets started

First, we will create an user profile component

````javascript
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
````

With this, our component will have all the necessary stuff to accomplish our requeriments. If you notice here, to assign CSS classes to a react component, you should assign them in className attribute. This is because `class` keyword is a reserved word in javascript world.

Next step is create an user avatar component

````javascript
class UserAvatar extends React.Component {
  render() {
    return <img src="https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png" />;
  }
}
````

Also, we need another component to keep our data, this will be named UserData.

````javascript
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
````

Now, we can replace placeholder mocks in our first user profile component

````javascript
class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            <!-- UserAvatar component added here -->
            <UserAvatar />
          </div>
          <div className="UserProfile-container">
            <!-- UserData component added here -->
            <UserData />
          </div>
        </div>
        <div>This is kermit, our CEO of ....</div>
      </article>
    );
  }
}
````

Then, we can replace former content of App component in this way

````javascript
class ExampleApp extends React.Component {
  render() {
    return <UserProfile />;
  }
}
````

Finally, our code will look like this

````javascript
import React from 'react';
import ReactDOM from 'react-dom';

class UserAvatar extends React.Component {
  render() {
    return <img src="https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png" />;
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
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            <UserAvatar />
          </div>
          <div className="UserProfile-container">
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

ReactDOM.render(<ExampleApp />, document.getElementById('example'));

````

To create some CSS styling for this example, we will use SuitCSS style guides to create CSS code. If you want to know more about suitcss please follow this link http://suitcss.github.io

````css
.UserProfile{
  width: 50%;
  margin: auto;
}

.UserProfile-avatar{

}

.UserProfile-container{
  display: inline-block;
  vertical-align: top;
}

.UserProfile-description{

}
````

now, save this file as styles.css under project folder. We only need to add it within index.html

````html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <title>My React BoilerPlate</title>
  <!-- here we will add our stylesheet -->
  <link rel="stylesheet" href="styles.css" />
</head>
````

Now, our example should be similar to this

![component][screen02]

The HTML code in chrome should be similar to this too

![html][screen03]

The most important thing here, is to keep our component as small as possible. With this in mind, we can reuse them anywhere we want.


## Props and States

Regrettably, with the current implementation of our react components, they are not as reusable as we want, because we have so many hardcoded values in them. However, we can refactor them to make more reusable, we can send dynamic properties to them. They are known as props.

### Props

Props are attributes we can send to any react component just like we assign HTML attributes to HTML elements.

E.g. if we want to send to our UserAvatar component some properties to work with, we can achieve it in this way

````javascript
// instead of just write this
<UserAvatar />

// we send attributes that can be used in a react component
<UserAvatar
  url="https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png"
  age={21}
  hidden={false}
  suggestions={['cats', 'lemon', 'rain', 'soccer', 'beach']}
  userPreferences={{maxResults: 3, backgroundColor: '#eaeaea', autoRefresh: false}} />
````

**NOTE** I must highlight one thing, just strings can be sent between quotation marks, the other data types must be between brackets.

So, we will refactor our UserAvatar component to change our hardcoded to this

````javascript
class UserAvatar extends React.Component {
  render() {
    //we can access to url property via this.props
    return <img src={this.props.url} />;
  }
}

//then we can send it the right url via url attribute
<UserAvatar url="https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png" />
````

Also, we change all the harcoded values from react components, and replace them with our new way of passing data

````javascript
class UserData extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{this.props.name}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{this.props.role}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>$ {this.props.salary} USD per year</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            <UserAvatar url="https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png" />
          </div>
          <div className="UserProfile-container">
            <UserData />
          </div>
        </div>
        <div>{this.props.description}</div>
      </article>
    );
  }
}
````

As you can see, the URL we want to send to react component is harcoded inside our component. To avoid this, we can
keep delegating the properties we want to our parent component and so on.

After all the refactor, our code will look like this

````javascript
import React from 'react';
import ReactDOM from 'react-dom';

class UserAvatar extends React.Component {
  render() {
    return <img src={this.props.url} />;
  }
}

class UserData extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{this.props.name}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{this.props.role}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>$ {this.props.salary} USD per year</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            <UserAvatar url={this.props.user.avatarURL} />
          </div>
          <div className="UserProfile-container">
            <UserData
              name={this.props.user.name}
              role={this.props.user.role}
              salary={this.props.user.salary} />
          </div>
        </div>
        <div>{this.props.user.description}</div>
      </article>
    );
  }
}

class ExampleApp extends React.Component {
  render() {
    return <UserProfile user={this.props.user} />;
  }
}

var user = {
  name: 'Kermit the frog',
  role: 'CEO',
  salary: '250,000',
  description: 'This is kermit, our CEO',
  avatarURL: 'https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png'
};

//we have delegated all the properties to our root component
//yes, we can also retrieve all the attributes we need in a property
ReactDOM.render(<ExampleApp user={user} />, document.getElementById('example'));
````

With this, the parent components can share data with children components. They can send properties to children components, and these will use them as they want.

**NOTE** The most important thing about props, is they area immutable data. This means, this properties sent by parent components their children **can not modify them**.

### State

Just using properties, we always be dependant that a parent component gives us all the properties we need. So with this in mind we have some issues

1. What happens when this component does not have a parent component(like ExampleApp) ?
1. What happens when I want to keep some app state, but props are immutable ?

For these cases, we can also have other special attribute called state. As its name indicates, it can keep internal app/component state.

With this in mind, we can refactor our ExampleApp component to this one

````javascript
class ExampleApp extends React.Component {
  //to create initial state data we must define a constructor method inside our react component
  constructor() {
    //we need to call this function to keep things working as expected
    super();

    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png'
      }
    };
  }

  render() {
    //instead of sending props data, we change that to use our internal state
    return <UserProfile user={this.state.user} />;
  }
}

//we delete from here user property and transfer it to internal component state
ReactDOM.render(<ExampleApp />, document.getElementById('example'));
````

The most important thing about state is when it changes, the component will be re rendered,
to show the new data. When this happens, the parent component will be rendered again and their child as well

To make this happen, we need to call a special method called `setState` and must be used like this

````javascript
this.setState(newState);
````

when this happens, the component will be re rendered. Now, to show you an example of this, we can add some some to our current code

````javascript
class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png'
      }
    };

    //we simulate a state change after 3.5 secs
    setTimeout(()=>{
      //to our user property we will assign him a new salary and role
      this.setState({
          user: {
              //this is part of new syntax of javascript to extend objects
              //like var newObject = $.extend(olderObj, newProperties);
              ...this.state.user,
              salary: '550,000',
              role: 'president'
          }
      });
    }, 3500);
  }
````

With this, we can store internal state to our app, and also we can send properties to our child components.

## Event handling

When we want to handle some event over a react component, we can achieve that without effort. To catch events in react they must be written in this way

````javascript
//each event must be written in camelcase
<UserAvatar onClick={eventHandler} onMouseOver={anotherEventHandler} />
````

To add this to our former example, we can catch when some user presses avatar image, this action will display
an alert which notify that action to our user.

````javascript
class UserAvatar extends React.Component {
  //we create our event handler inside react component in this way
  handleClick() {
    alert('Hey you, stop clicking at me !');
  }

  render() {
    //then we add this to the HTML markup
    return <img src={this.props.url} onClick={this.handleClick} />;
  }
}
````

The, when our user pressed the avatar images it will activate the alert. It is important to mention here, that we can also create event that children components will take and do something.

Following the same example above, we can also achieve that in this way(the other code will be omitted by the sake of brevity)

````javascript
class UserAvatar extends React.Component {
  render() {
    return <img src={this.props.url} onClick={this.props.onClick} />;
  }
}

class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            <UserAvatar
                url={this.props.user.avatarURL}
                onClick={this.props.handleClick} />
          </div>
          <div className="UserProfile-container">
            <UserData
              name={this.props.user.name}
              role={this.props.user.role}
              salary={this.props.user.salary} />
          </div>
        </div>
        <div>{this.props.user.description}</div>
      </article>
    );
  }
}

class ExampleApp extends React.Component {
  handleClick() {
    alert('hey listen, you are click over my image!');
  }

  render() {
    return <UserProfile handleClick={this.handleClick} />;
  }
````

## Modules

Each time we add new react components or new features to our codebase, our single file will be growing bigger and so on. This in some point will make our code hard to maintain and hard to make refactors and changes.

To solve this issue, with the new javascript version we can use modules just like other languages do. This allow us split our code to smaller pieces and keep them as reusable as they can.

Let's return to our working example

````javascript
import React from 'react';
import ReactDOM from 'react-dom';

class UserAvatar extends React.Component {
  handleClick() {
    alert('Hey you, stop clicking at me !');
  }

  render() {
    return <img src={this.props.url} onClick={this.handleClick} />;
  }
}

class UserData extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{this.props.name}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{this.props.role}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>$ {this.props.salary} USD per year</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            <UserAvatar url={this.props.user.avatarURL} />
          </div>
          <div className="UserProfile-container">
            <UserData
              name={this.props.user.name}
              role={this.props.user.role}
              salary={this.props.user.salary} />
          </div>
        </div>
        <div>{this.props.user.description}</div>
      </article>
    );
  }
}

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png'
      }
    };

    //simulamos un cambio de estado luego de 3,5 segundos
    setTimeout(()=>{
      //a nuestro usuario le asignamos un nuevo sueldo y un nuevo rol dentro de la empresa
      this.setState({user:{...this.state.user, salary: '550,000', role: 'president'}});
    }, 3500);
  }

  render() {
    return <UserProfile user={this.state.user} />;
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('example'));
````

This we will refactor to a more modular approach. The first thing we need to do is to create a component folder.
Then we will create the following files inside it.

- UserAvatar.js
- UserData.js
- UserProfile.js
- ExampleApp.js

Then we will copy our UserAvatar component in UserAvatar.js file, then we can delete the code from main.js. The same steps we need to repeat with UserData and UserProfile

After this, if we try to run the same code, we will get the following error:

![error][screen04]

This occurs because now our app is split into multiple files. To make our example running as before, we need to refactor a little bit these files.

So, we will begin with our UserAvatar.js file

````javascript
class UserAvatar extends React.Component {
  handleClick() {
    alert('Hey you, stop clicking at me !');
  }

  render() {
    return <img src={this.props.url} onClick={this.handleClick} />;
  }
}

//we add this line that allow us to export this snippet of code to other modules
export default UserAvatar;
````

The one thing we can notice is we are adding the sentence `export default UserAvatar`. This is necessary to indicate that our UserAvatar component can be imported by other modules.

We do this same task inside UserProfile and UserData. Now, inside main.js code will be written like this

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
// here we import our component from a module
// import ComponentName from 'relativePath';
import UserProfile from './components/UserProfile';

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png'
      }
    };

    setTimeout(()=>{
      this.setState({user:{...this.state.user, salary: '550,000', role: 'president'}});
    }, 3500);
  }

  render() {
    return <UserProfile user={this.state.user} />;
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('example'));
````

If we do this in our code, then in browser's console will output an error like this

![error][screen05]

This happens because in our module we do not have defined any dependency in it. In this case, we need to load
React to use it. So, to import this dependency, we need to add just one more line to accomplish that

````javascript
//this is the line we are adding to load react dependency
import React from 'react';
import UserAvatar from './UserAvatar';
import UserData from './UserData';

class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            <UserAvatar url={this.props.user.avatarURL} />
          </div>
          <div className="UserProfile-container">
            <UserData
              name={this.props.user.name}
              role={this.props.user.role}
              salary={this.props.user.salary} />
          </div>
        </div>
        <div>{this.props.user.description}</div>
      </article>
    );
  }
}

export default UserProfile;
````

Also, UserAvatar and UserData will need this same dependency, so add it in the same way as we did before.

After this, we can see how our react example will behave as before.

![screen][screen02]

Now, the one task left here is to copy our ExampleApp component into ExampleApp.js, if we do this, the code in ExampleApp.js will look like this

````javascript
import React from 'react';
import UserProfile from './components/UserProfile';

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png'
      }
    };

    //simulamos un cambio de estado luego de 3,5 segundos
    setTimeout(()=>{
      //a nuestro usuario le asignamos un nuevo sueldo y un nuevo rol dentro de la empresa
      this.setState({user:{...this.state.user, salary: '550,000', role: 'president'}});
    }, 3500);
  }

  render() {
    return <UserProfile user={this.state.user} />;
  }
}

export default ExampleApp;
````

When we finish this task, our main.js file should be like this one

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ExampleApp from './components/ExampleApp';

ReactDOM.render(<ExampleApp />, document.getElementById('example'));
````

Now, this error will be displayed in our console

![screen][screen06]

Please do not be afraid, this occurs because we have forgotten to change the import route of UserProfile component
in ExampleApp.js, so we need to refactor it

````javascript
import React from 'react';

//we change this line for next one
//import UserProfile from './components/UserProfile';
import UserProfile from './UserProfile';

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png'
      }
    };

    setTimeout(()=>{
      this.setState({user:{...this.state.user, salary: '550,000', role: 'president'}});
    }, 3500);
  }

  render() {
    return <UserProfile user={this.state.user} />;
  }
}

export default ExampleApp;
````

Finally, our code should look like this

Finalmente, todo nuestro código debería quedar así:

````javascript
/********** UserAvatar.js **********/
import React from 'react';

class UserAvatar extends React.Component {
  handleClick() {
    alert('Hey you, stop clicking at me !');
  }

  render() {
    return <img src={this.props.url} onClick={this.handleClick} />;
  }
}

export default UserAvatar;
/********** UserAvatar.js **********/


/********** UserData.js **********/
import React from 'react';

class UserData extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{this.props.name}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{this.props.role}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>$ {this.props.salary} USD per year</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default UserData;
/********** UserData.js **********/


/********** UserProfile.js **********/
import React from 'react';
import UserAvatar from './UserAvatar';
import UserData from './UserData';

class UserProfile extends React.Component {
  render(){
    return (
      <article className="UserProfile">
        <h3>User Profile</h3>
        <div>
          <div className="UserProfile-container">
            <UserAvatar url={this.props.user.avatarURL} />
          </div>
          <div className="UserProfile-container">
            <UserData
              name={this.props.user.name}
              role={this.props.user.role}
              salary={this.props.user.salary} />
          </div>
        </div>
        <div>{this.props.user.description}</div>
      </article>
    );
  }
}

export default UserProfile;
/********** UserProfile.js **********/


/********** ExampleApp.js **********/
import React from 'react';
import UserProfile from './UserProfile';

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'https://dl.dropboxusercontent.com/u/18850435/tutorial/Kermit.png'
      }
    };

    setTimeout(()=>{
      this.setState({user:{...this.state.user, salary: '550,000', role: 'president'}});
    }, 3500);
  }

  render() {
    return <UserProfile user={this.state.user} />;
  }
}

export default ExampleApp;
/********** ExampleApp.js **********/


/********** main.js **********/
import React from 'react';
import ReactDOM from 'react-dom';
import ExampleApp from './components/ExampleApp';

ReactDOM.render(<ExampleApp />, document.getElementById('example'));
/********** main.js **********/
````

The project structure should look similar to this image below

![structure][screen07]


## Real example

Until now, we have done some basic examples to understand how react works. This time, we are going to create a real example with a real use case.

We will create a Flickr search term which allow us to find photos related to search terms.

- We need to use jQuery.js or Zepto.js to manage AJAX calls
- This library has to be included in index.html

The HTML code should look like this

![screen09][screen09]

We will follow the main idea about create multiple react components. So, in this case we need to create
several javascript files to achieve that:

- services: we save all the logic to make AJAX calls to server side and to create correct URL.
- FlickrImage: responsible for showing the retrieved image
- ImageGallery: component that holds a FlickImage list to show to us
- SearchTermContainer: component with the search term input and action button to begin search
- FlickrApp: Wrapper holding everything else


First of all, we will write all the needed logic to create AJAX calls in services.js

````javascript
//function that allow us to create the correct URL according to search term
const url = searchTerm => (
  `https://api.flickr.com/services/feeds/photos_public.gne?tags=${searchTerm}&format=json&&jsoncallback=?`
);

//function that allow us to make AJAX request to retrieve the info according to URL
export const findPhotosByTerm = (searchTerm, cb) => $.get(url(searchTerm), cb);
````

So, when we create a ajax call searching for kitties, the created URL for that term should be similar to this:
`https://api.flickr.com/services/feeds/photos_public.gne?tags=kitties&format=json&&jsoncallback=?`

After this, we will create the code for FlickrImage component

````javascript
import React from 'react';

/**
 *  component for image rendering
 *  @param <string> url: needed URL to show in HTML
 **/
class FlickrImage extends React.Component {
  render() {
    return <img src={this.props.url} />
  }
}

export default FlickrImage;
````

Then, we need to create an Image gallery component to wrap all our FlickImages we found with
search term.

````javascript
import React from 'react';
import FlickrImage from './FlickrImage';

/**
 *  wrapper component that holds all the FlickrImages
 *  @param <list<string>> photos: URL list where we will fetch images
 **/
class ImageGallery extends React.Component {
  render() {
    var photos = this.props.photos.map((photoURL, index) => <FlickrImage key={index} url={photoURL} />);
    return <div>{photos}</div>;
  }
}

export default ImageGallery;
````

Now, the code for SearchTermContainer component should be similar to this

````javascript
import React from 'react';
import { findPhotosByTerm } from './services';

/**
 *  it holds the input for search term to search for
 *  @param <function> queryResolvedHandler: function that manage what we will do with search results
 **/
class SearchTermContainer extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const searchTerm = this.refs.input.value;
    findPhotosByTerm(searchTerm, this.props.queryResolvedHandler);
  }

  render() {
    return (
      <div>
        <input ref="input" type="text" />
        <button onClick={this.onClick}>Search</button>
      </div>
    );
  }
}

export default SearchTermContainer;
````

The last component we need is FlickApp that contains all other components

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import SearchTermContainer from './SearchTermContainer';
import ImageGallery from './ImageGallery';

/**
 *  main component that holds application state
 **/
class FlickrApp extends React.Component {
  constructor() {
    super();
    this.state = { photos: [] };
    this.handleAjaxResponse = this.handleAjaxResponse.bind(this);
  }

  handleAjaxResponse(data) {
    this.setState({ photos: data.items.map(item => item.media.m) });
  }

  render() {
    return (
      <div>
        <SearchTermContainer queryResolvedHandler={this.handleAjaxResponse} />
        <ImageGallery photos={this.state.photos} />
      </div>
    );
  }
}

export default FlickrApp;
````

Finally, we should get something similar to this:

![screen][screen08]


## Flux vs MVC

![flux-vs-mvc][flux-vs-mvc-source]

To really understand what is the big deal with flux instead of just using MVC as always. Let's understand what MVC means in frontend side.


### MVC

MVC is a software pattern design that allow us to separate our systems/apps/programs into at least 3 layers that will be described right now

- **Model** is the layer that represents data and business logic inside our software. This layer is commonly
done in javascript taking a JSON object as a store or using an indexed db in browser side.
- **View** is the layer that represents data to user in a meaningful way. Also, this layer is responsible to react to user interactions creating actions.
- **Controller** this layer is responsible to bind view actions to make updates directly to our model in a secure way. Also, all the changes done in model layer can be abstracted in this layer to send this info to view layer.

As you can see, this representation of MVC differs a little from original backend side version of MVC. This is because in frontend side, all these layers have a little blurry line between them. It is too common that this separation can be easily forgotten.

So, for these cases in frontend we have alternatives to pure version of MVC, they are called MV* versions. In these versions, our MV* can be represented as MVC(model-view-controller), MVVM(model-view-viewmodel) and so on.

Just to show you an example of this, we can see this picture to understand best

![mvc-1][mvc-source-0]

It is important to say, that some frameworks like Angular and Ember to make things simpler, they offer to do a big step creating two-way data binding. This, allow us to synchronize our view updates directly into model and viceversa.

However, when apps grew bigger, this approach can give us some headaches trying to figure out what race condition is being triggered after few actions.

To demonstrate what i am saying, let me show you this(this picture represents perfectly what I have to live some time ago).

![mvc-nightmare][mvc-source-1]


### Flux

For the opposite side, facebook created flux as a software design pattern to deal with this problem.

These are the parts compose Flux architecture:

- **Action / Action creator** This is responsible to represent what type of action we are doing in the app,
E.g.: adding a product to a shopping cart, press play button to watch a video, etc.
- **Dispatcher** This is responsible to receive our actions and it have to deal to send these actions to all stores that are registered here(you might compare it with our C part of MVC).
- **Store** We might call it our model part. In this section, we hold all our data, but unlikely model, stores can represent more than just 1 type of data. So, it is more flexible and old models.
- **View** This represents the View as we now.

To understand what is this representation in a picture, let me show you this

![flux][flux-source]


## Flux implementation by Facebook

To make things as simple as possible, we will not use modules to keep components separated at all. Instead, we will use the module pattern to encapsulate our inner implementation from public interface.

If you do not know about which software design patterns are commonly used in javascript, you can visit this link to learn about [JAVASCRIPT DESIGN PATTERNS][javascript-design-patterns-source]

Our very first step is import all the dependencies that we will need

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Dispatcher } from 'flux';
import { EventEmitter } from 'events';
````

`Dispatcher` is the one made by facebook and `EventEmitter` is a nodejs library that allow us to use in some sense the publisher/suscriber pattern.

Now, we need to create our custom dispatcher handler that allow us to use for our needs.


````javascript

//we encapsulate it inside our 'flux' module
const flux = (() => {
  //facebook dispatcher
  const dispatcher = new Dispatcher();

  const publicAPI = {
    register(callback){
      dispatcher.register(callback);
    },
    dispatch(action){
      dispatcher.dispatch(action);
    }
  };

  return publicAPI;
})();
````

Them, we code the action creators, responsibles of emit the action we want to trigger:

````javascript

//all our actions will be kept inside our actions object
const actions = (() => {
  return {
    addProducts(products){
      flux.dispatch({
        actionType: 'ADD_PRODUCTS',
        products
      })
    },
    findAllProducts(){
      flux.dispatch({
        actionType: 'ALL_PRODUCTS'
      });
    },
    addProduct(product){
      flux.dispatch({
        actionType: 'ADD_PRODUCT',
        product
      });
    },
    removeProduct(index){
      //just in case we need to implement it later
    }
  };
})();
````

Next step is our own implementation of store:

````javascript
//this will be our event we will be listening to emit changes and responding to changes
const CHANGE_EVENT = 'change';

//our flux store
const store = (() => {
  //catalog products
  var catalogProducts = [];

  //shopping cart products
  var basketItems = [];

  //with this function we will add products to our basket
  const addProduct = product => basketItems.push(product);

  //with this function we will replenish all the products to our catalog
  const addProducts = products => catalogProducts = products;

  //we extend the original EventEmitter to make it as a store
  const Store = {
    ...EventEmitter.prototype,
    emitChange(){
      this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
      this.removeListener(callback);
    },
    getProducts(){
      return catalogProducts;
    },
    getBasketItems(){
      return basketItems;
    },
    dispatcherIndex: flux.register((action) => {
      switch(action.actionType){
        case 'ADD_PRODUCTS':
          addProducts(action.products);
          break;
        case 'ALL_PRODUCTS':
          break;
        case 'ADD_PRODUCT':
          addProduct(action.product);
          break;
      }

      Store.emitChange();
    })
  };

  return Store;
})();
````

Now, we need to create all our components we will use

````javascript

const ProductImage = props => <img src={props.URL} />;

const Product = props => (
  <div className="Product">
    <div className="u-center"><ProductImage URL={props.imageURL} /></div>
    <div className="Product-trademark">{props.trademark}</div>
    <div className="Product-description">{props.description}</div>
    <div className="Product-price">{props.price}</div>
    <div className="u-center">
      <button className="Button Button--green" onClick={props.onClick(props)}>Add to cart</button>
    </div>
  </div>
);

const ProductList = props => (
  <div className="u-center">
    {props.products.map(productData => (
      <Product
        onClick={props.addToCart}
        key={productData.id}
        {...productData} />
      )
    )}
  </div>
);

const Item = props => (
  <div className="u-box">
    <div><ProductImage URL={props.imageURL} /></div>
    <div>Product ID: {props.id}</div>
    <div>Trademark: {props.trademark}</div>
  </div>
);

const Basket = props => (
  <div>
    <h4>Items in basket</h4>
    {props.products.map((product, index) => <Item key={index} {...product} />)}
  </div>
);
````

Now, we need to create our App(root component)

````javascript
class FluxApp extends React.Component {
  constructor(){
    super();

    this.state = { products: [], basketProducts: [] };
    this.refreshState = this.refreshState.bind(this);
  }

  //before this can be actually rendered in DOM, we will be listening for store changes
  componentWillMount(){
    store.addChangeListener(this.refreshState);
  }

  //it will be executed each time when our store emits a change
  refreshState(state){
    this.setState({
      products: store.getProducts(),
      basketProducts: store.getBasketItems()
    });
  }

  //this is our action creator, that will execute our add to cart action
  addToCart(props) {
    return function(){
      actions.addProduct({
        id: props.id,
        description: props.description,
        price: props.price,
        trademark: props.trademark,
        imageURL: props.imageURL
      });
    };
  }

  render() {
    const basketProducts = this.state.basketProducts;
    const catalogProducts = this.state.products;

    return (
      <div>
        <Basket products={basketProducts} />
        <h3>Product List</h3>
        <ProductList products={catalogProducts} addToCart={this.addToCart} />
      </div>
    );
  }
}

ReactDOM.render(<FluxApp />, document.getElementById('example'));

//we retrieve the product catalog via AJAX
$.get('/data.json', function(products){
  actions.addProducts(products);
});
````

Finally, our code should look similar to this(removing all comments)

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Dispatcher } from 'flux';
import { EventEmitter } from 'events';

const flux = (() => {
  const dispatcher = new Dispatcher();

  const publicAPI = {
    register(callback){
      dispatcher.register(callback);
    },
    dispatch(action){
      dispatcher.dispatch(action);
    }
  }

  return publicAPI;
})();

const actions = (() => {
  return {
    addProducts(products){
      flux.dispatch({
        actionType: 'ADD_PRODUCTS',
        products
      })
    },
    findAllProducts(){
      flux.dispatch({
        actionType: 'ALL_PRODUCTS'
      });
    },
    addProduct(product){
      flux.dispatch({
        actionType: 'ADD_PRODUCT',
        product
      });
    },
    removeProduct(index){
    }
  };
})();

const CHANGE_EVENT = 'change';

const store = (() => {
  var catalogProducts = [];

  var basketItems = [];

  const addProduct = product => basketItems.push(product);

  const addProducts = products => catalogProducts = products;

  const Store = {
    ...EventEmitter.prototype,
    emitChange(){
      this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
      this.removeListener(callback);
    },
    getProducts(){
      return catalogProducts;
    },
    getBasketItems(){
      return basketItems;
    },
    dispatcherIndex: flux.register((action) => {
      switch(action.actionType){
        case 'ADD_PRODUCTS':
          addProducts(action.products);
          break;
        case 'ALL_PRODUCTS':
          break;
        case 'ADD_PRODUCT':
          addProduct(action.product);
          break;
      }

      Store.emitChange();
    })
  };

  return Store;
})();

const ProductImage = props => <img src={props.URL} />;

const Product = props => (
  <div className="Product">
    <div className="u-center"><ProductImage URL={props.imageURL} /></div>
    <div className="Product-trademark">{props.trademark}</div>
    <div className="Product-description">{props.description}</div>
    <div className="Product-price">{props.price}</div>
    <div className="u-center">
      <button className="Button Button--green" onClick={props.onClick(props)}>Add to cart</button>
    </div>
  </div>
);

const ProductList = props => (
  <div className="u-center">
    {props.products.map(productData => (
      <Product
        onClick={props.addToCart}
        key={productData.id}
        {...productData} />
      )
    )}
  </div>
);

const Item = props => (
  <div className="u-box">
    <div><ProductImage URL={props.imageURL} /></div>
    <div>Product ID: {props.id}</div>
    <div>Trademark: {props.trademark}</div>
  </div>
);

const Basket = props => (
  <div>
    <h4>Items in basket</h4>
    {props.products.map((product, index) => <Item key={index} {...product} />)}
  </div>
);

class FluxApp extends React.Component {
  constructor(){
    super();

    this.state = { products: [], basketProducts: [] };
    this.refreshState = this.refreshState.bind(this);
  }

  componentWillMount(){
    store.addChangeListener(this.refreshState);
  }

  refreshState(state){
    this.setState({
      products: store.getProducts(),
      basketProducts: store.getBasketItems()
    });
  }

  addToCart(props) {
    return function(){
      actions.addProduct({
        id: props.id,
        description: props.description,
        price: props.price,
        trademark: props.trademark,
        imageURL: props.imageURL
      });
    };
  }

  render() {
    const basketProducts = this.state.basketProducts;
    const catalogProducts = this.state.products;

    return (
      <div>
        <Basket products={basketProducts} />
        <h3>Product List</h3>
        <ProductList products={catalogProducts} addToCart={this.addToCart} />
      </div>
    );
  }
}

ReactDOM.render(<FluxApp />, document.getElementById('example'));

$.get('/data.json', function(products){
  actions.addProducts(products);
});
````

our CSS should be like this

````css
.u-center{
  text-align: center;
}

.u-box{
  vertical-align: top;
  display: inline-block;
  box-sizing: border-box;
}

.Product{
  display: inline-block;
  vertical-align: top;
  border: 1px solid #eaeaea;
  padding: 1em;
  box-sizing: border-box;
  width: 20%;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  transition: all 0.3s linear;
}

.Product:hover{
  -webkit-filter: grayscale(0%);
  filter: grayscale(00%);
}

.Product-image{
}

.Product-trademark{
  text-align: left;
}

.Product-description{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}

.Product-price:before{
  content: '$ ';
}

.Button{
  padding: 0.5em;
  border-radius: 0.3em;
  cursor: pointer;
}

.Button--green{
  background-color: #4ade35;
  color: white;
  border: 3px solid #4ade35;
}
````

Then, our json data should be something like this

````json
[
    {
        "id": 1,
        "description": "Product 1 description",
        "price": 1900,
        "trademark": "Juan Valdez",
        "imageURL": "http://placehold.it/150.jpeg/e35fe3/969696"
    },
    {
        "id": 2,
        "description": "Product 2 description",
        "price": 2000,
        "trademark": "Coca cola",
        "imageURL": "http://placehold.it/150.jpeg/e0284d/969696"
    },
    {
        "id": 3,
        "description": "Product 3 description",
        "price": 3500,
        "trademark": "Starbucks",
        "imageURL": "http://placehold.it/150/1b9457/969696"
    },
    {
        "id": 4,
        "description": "Product 4 description",
        "price": 1000,
        "trademark": "Mc Cafe",
        "imageURL": "http://placehold.it/150/4d0a19/969696"
    },
    {
        "id": 5,
        "description": "Product 5 description",
        "price": 2500,
        "trademark": "Hard rock cafe",
        "imageURL": "http://placehold.it/150/5e1b5e/969696"
    }
]
````

So, our example should look similar to this(regardless the pictures)

![screen][screen14]


## Flux implementation by Redux

However, the former example using the facebook implementation is somewhat redundant and you need code that can be omitted.

In this same example we will continue using flux, but with another approach, we will use Redux library. Redux, alongside original facebook implementation, is the most popular library to implement flux and is widely adopted between javascript developers.

Redux besides follows three main principles:

- Application state is stored in just 1 store.
- The state is just readonly, to make changes in this state it should emit an action explicitly.
- Any state change inside our store, it must be represented by a completely new object.

To install redux, we need to

Redux, aparte de lo que profesa facebook, adicionalmente se basa en tres principios principales:

El estado de la aplicación es almacenado en un objeto dentro de un solo store.

Los estados son de solamente lectura, para realizar cambios sobre dicho estado se debe emitir una acción de manera explicita. Con esto se evitan las "race conditions"

Cualquier cambio de estado del store, debe ser representado por un objeto completamente nuevo.
Para instalar redux ingresaremos las siguientes lineas en nuestra terminal

````shell
$ npm install --save redux
````

To simplify the example, We are going to just work within 1 file. The first thing we should do is to import our dependencies:

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
````

As you can see, we are importing two functions ... `createStore` and `combineReducers`, these we will know what they are and what they do later.

Then, we create our reducers, but first we need to know what are reducers. Reducers, are functions that receive
the former application state as first argument and the triggered action as second argument. Then, they must return the new application state. They have the following restrictions:

- They must be pure functions(they must not alter any element outside of their scope).
- They must always return the new application state.
- If our new application state changes, we must return a whole new object for the state. We must not mutate the former one.   

To apply these restrictions, we will do it through our product catalog:

````javascript
/**
  we receive these arguments in this order:
  1.- previous application state
  2.- action that is being triggered
*/
function productCatalog(previousState = [], action){
  switch(action.type){
    case 'ALL_PRODUCTS':
      return previousState;
    case 'ADD_PRODUCTS':
      //in ES5 this is equal to: previousState.slice(0).concat(action.products);
      return [...previousState, ...action.products];
    default:
      return previousState;
  }
}
````

The most important thing here is to notice in 'ADD_PRODUCTS' case occurs something very interesting:

We take the previous state(that is an array), we create a copy of this and then we add the new elements.
As I said before, the main idea is not mutate the previous state, but to create a new one from the former one.

So, we have our first reducir responsible of doing product catalog stuff. Now, we can create another reducer to handle our shopping cart basket.

````javascript
function shoppingCart(previousState = [], action){
  switch(action.type){
    case 'ADD_PRODUCT':
      return [...previousState, action.product];
    case 'REMOVE_PRODUCT':
      return [
        ...previousState.slice(0, action.index),
        ...previousState.slice(action.index + 1)
      ];
    default:
      return previousState;
  }
}
````

The best thing about reducers is you can create as many as you want. Each of these will be responsible for a specific section in our application. Each of these can listen to certain actions.

Then, our reducers can be composed to create just one reducer that has all the functionalities of each of those through this simple line:

````javascript
var rootReducer = combineReducers({ productCatalog, shoppingCart });

//Babel translates the code from above to this one
var rootReducer = combineReducers({ productCatalog: productCatalog, shoppingCart: shoppingCart });
````

To create the store, we need to do this

````javascript
var store = createStore(rootReducer);

//we just subscribe a callback to know when our store state changes
store.subscribe(() => console.log('new state : ', store.getState()));
````

Now, we will begin to create our React components like as we have done before.

Ahora, comenzaremos a crear nuestros componentes React como ya lo hemos hecho anteriormente.

Lets start with ProductImage component

````javascript
//if we are not going to handle state, we can refactor this component as below shows
class ProductImage extends React.Component {
  render() {
    return <img src={this.props.URL} />;
  }
}

const ProductImage = (props) => <img src={props.URL} />;
````

Then we create Product component

````javascript
class Product extends React.Component {
  render() {
    return (
      <div className="Product">
        <div className="u-center"><ProductImage URL={this.props.imageURL} /></div>
        <div className="Product-trademark">{this.props.trademark}</div>
        <div className="Product-description">{this.props.description}</div>
        <div className="Product-price">{this.props.price}</div>
        <div className="u-center">
          <button className="Button Button--green" onClick={this.props.onClick(this.props)}>Add to cart</button>
        </div>
      </div>
    );
  }
}

const Product = (props) => (
  <div className="Product">
    <div className="u-center"><ProductImage URL={props.imageURL} /></div>
    <div className="Product-trademark">{props.trademark}</div>
    <div className="Product-description">{props.description}</div>
    <div className="Product-price">{props.price}</div>
    <div className="u-center">
      <button className="Button Button--green" onClick={props.onClick(props)}>Add to cart</button>
    </div>
  </div>
);
````

Also we need to create ProductList component

````javascript
class ProductList extends React.Component {
  render() {
    return (
      <div>
        {this.props.products.map(productData => (
          <Product
            onClick={this.props.addToCart}
            key={productData.id}
            {...productData} />
          )
        )}
      </div>
    );
  }
}

const ProductList = (props) => (
  <div>
    {props.products.map(productData => (
      <Product
        onClick={props.addToCart}
        key={productData.id}
        {...productData} />
      )
    )}
  </div>
);

const Item = props => (
  <div className="u-box">
    <div><ProductImage URL={props.imageURL} /></div>
    <div>Product ID: {props.id}</div>
    <div>Trademark: {props.trademark}</div>
  </div>
);

class Basket extends React.Component {
  render() {
    return (
      <div>
        <h4>Items in basket</h4>
        {this.props.products.map((product, index) => <Item key={index} {...product} />)}
      </div>
    );
  }
}

const Basket = (props) => (
  <div>
    <h4>Items in basket</h4>
    {props.products.map((product, index) => <Item key={index} {...product} />)}
  </div>
);
````

Now, we just need to create our App

````javascript
/**
  this one is different, because it holds some actions inside our app
  so, for this case we will not
*/
class ReduxApp extends React.Component {
  constructor(){
    super();
    store.subscribe(this.forceUpdate.bind(this));
  }

  addToCart(props) {
    return function(){
      store.dispatch({
        type: 'ADD_PRODUCT',
        product: { ...props }
      });
    };
  }

  render() {
    const basketProducts = store.getState().shoppingCart;
    const catalogProducts = store.getState().productCatalog;

    return (
      <div>
        <Basket products={basketProducts} />
        <ProductList products={catalogProducts} addToCart={this.addToCart} />
      </div>
    );
  }
}
````

Finally, our code should look like this :

````javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

function productCatalog(state = [], action){
  switch(action.type){
    case 'ALL_PRODUCTS':
      return state;
    case 'ADD_PRODUCTS':
      return [...state, ...action.products];
    default:
      return state;
  }
}

function shoppingCart(state = [], action){
  switch(action.type){
    case 'ADD_PRODUCT':
      return [...state, action.product];
    case 'REMOVE_PRODUCT':
      return {
        products: [
          ...state.slice(0, action.index),
          ...state.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
}

var rootReducer = combineReducers({ productCatalog, shoppingCart });
var store = createStore(rootReducer);
store.subscribe(() => console.log('new state : ', store.getState()));

const ProductImage = props => <img src={props.URL} />;

const Product = props => (
  <div className="Product">
    <div className="u-center"><ProductImage URL={props.imageURL} /></div>
    <div className="Product-trademark">{props.trademark}</div>
    <div className="Product-description">{props.description}</div>
    <div className="Product-price">{props.price}</div>
    <div className="u-center">
      <button className="Button Button--green" onClick={props.onClick(props)}>Add to cart</button>
    </div>
  </div>
);

const ProductList = props => (
  <div className="u-center">
    {props.products.map(productData => (
      <Product
        onClick={props.addToCart}
        key={productData.id}
        {...productData} />
      )
    )}
  </div>
);

const Item = props => (
  <div className="u-box">
    <div><ProductImage URL={props.imageURL} /></div>
    <div>Product ID: {props.id}</div>
    <div>Trademark: {props.trademark}</div>
  </div>
);

const Basket = props => (
  <div>
    <h4>Items in basket</h4>
    {props.products.map((product, index) => <Item key={index} {...product} />)}
  </div>
);

class ReduxApp extends React.Component {
  constructor(){
    super();
    store.subscribe(this.reRender.bind(this));
  }

  reRender(){
    this.forceUpdate();
  }

  addToCart(props) {
    return function(){
      store.dispatch({
        type: 'ADD_PRODUCT',
        product: { ...props }
      });
    };
  }

  render() {
    const basketProducts = store.getState().shoppingCart;
    const catalogProducts = store.getState().productCatalog;

    return (
      <div>
        <Basket products={basketProducts} />
        <h3>Product List</h3>
        <ProductList products={catalogProducts} addToCart={this.addToCart} />
      </div>
    );
  }
}

ReactDOM.render(<ReduxApp />, document.getElementById('example'));

$.get('/data.json', function(products){
  store.dispatch({ type: 'ADD_PRODUCTS', products});
});
````

We are going to use the same CSS used in facebook flux. So, in this case the application should behave as before

![screen][screen14]


## Browserify and Webpack

In the past, javascript did not have a module system as other languages do. To solve this issue, many developers did choose to follow two options to encapsulate their code:

- Using module pattern
- Using namespace method

````javascript
//using module pattern
var myModule = (function(){
  var myPrivateCounter = 0;

  return {
    increment: function(){
      myPrivateCounter++;
    },

    getCounter: function(){
      return myPrivateCounter;
    }
  };
})();
````

````javascript
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
````

When nodeJS appeared, it was created a module system specification(named commonJS). This spec, has a module system in this way:

exporting modules

````javascript
//exporting modules with commonJS syntax
module.exports = {
  foo: function(num, workerName){
    return workerName + '-' + num;
  }
};
````

importing modules

````javascript
//importing modules with commonJS syntax
var myModule = require('../utils/myModule');

myModule.foo(1, 'dave');
````

This same functionality is possible now in browsers thanks to Browserify and Webpack. Each of these implement this spec. If you use one of these package bundlers we can joy to get all this benefits.

Now, ES6 proposed their own spec to modules. This new approach is more powerful than commonJS, and we can use it thanks to babel, then it will transpile that code to old commonJS syntax.

The biggest difference between browserify and webpack is that browserify is easier to use because it does not have too much configuration to get started. Webpack instead es a lot more configurable and powerful, but it requires a more detailed configuration to begin to work with.

In this tutorial we have used webpack in backstage. We will learn how to use both of them and how to use them with GULP.


## Gulp

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


## CSS Preprocessors

Now, we will discuss a new tool to help us creating CSS styles. These tools help us to create CSS styles easily, also they provide us loops and metaprogramming to create styles. These tools are called CSS preprocessors and we will use them from now on.

### Sass vs Less vs Stylus

Among these, there are three most popular it is worth to mention them:

- **Less** It is the most popular right now, it is so similar to use plain CSS, and it can be used directly in browser with just 1 js file to preprocess Less Styles.
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


## Unit tests

Until now, we have learned how to create React components, configure webpack and browserify, use gulp and how to create tasks with it.

So, with this in mind, if all of our work is being automated, how we can automate our tests ?

Well, I have to say we can achieve this with units tests.

### What are unit tests

Según wikipedia las pruebas unitarias son lo siguiente:

> In programming, unit test is a way to test the correct behavior from a specific module or code. This is useful to have the confidence each of modules can works perfectly.

With unit test we can achieve the next ideas

- Test automatization
- Easier bug detection
- Easier code refactoring

### Tape vs Mocha

To make use of unit tests, we have to choose among many tools. I can recommend you two among them that make my life easier.

- **Tape** A simple tool to test your code by assertion tests. It is easy to use and is easy to learn.
- **Mocha** A complete tool that allow us to customize everything in it.

For this tutorial we will use Tape. So, we need to install a couple of dependencies to begin to work with.

````shell
$ npm install --save-dev tape babel-tape-runner extend-tape tape-jsx-equals react-addons-test-utils react-unit faucet
````

Now, we need to modify our package.json file just a little bit:


````javascript
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack --progress --colors",
  "build-prod": "webpack --optimize-minimize --progress --colors",
  "gulp-copy": "gulp copy",
  "gulp": "gulp",
  "test": "babel-tape-runner test.js | faucet"
},
"babel": {
  "presets": ["es2015", "react", "stage-2"]
}
````

With this, we now can use tape to start unit testing of our code.


### My first unit test

Para hacer eso esta lo siguiente, crearemos una funcion suma que realice la suma de dos numeros.

````javascript
import test from 'tape';

//function to make a sum of a plus b
function add(a, b) {
  return a + b;
}

//this is our test we are going to run
test('it should add correctly in these cases', t => {
  //actual values and expected values
  const values = [
    { actual: add(1, 2), expected: 3 },
    { actual: add(2, 2), expected: 4 },
    { actual: add(2, -5), expected: -3 }
  ];

  values.forEach(value => (
    t.equal(value.actual, value.expected,
      `actual ${value.actual} expected ${value.expected}`
    )
  ));

  //we will finish our tests for this case
  t.end();
});
````

with this file, we can run our tests this way

![screen][screen15]

In this case, we have prove that adding two numbers was done as expected. However, if we want to use our test cases to our function to be "bug free" we need to add more tests.

````javascript
const values = [
  { actual: add(1, 2), expected: 3 },
  { actual: add(2, 2), expected: 4 },
  { actual: add(2, -5), expected: -3 },
  //new test cases
  { actual: add(2, '3'), expected: 5 },
  { actual: add('a', 'b'), expected: 0 },
  { actual: add(), expected: 0 },
  { actual: add(null, false), expected: 0 },
  { actual: add(undefined, ''), expected: 0 },
  { actual: add(true, []), expected: 0 }
];
````

Now, we execute again our test and this happens

![screen][screen16]

As you can see, our function is not robust as we think. So we need to do some little changes if we want to behave properly:

````javascript
function add(a, b) {
  a = isNaN(a) ? 0 : parseInt(a, 10);
  b = isNaN(b) ? 0 : parseInt(b, 10);

  return isNaN(a + b) ? 0 : a + b;
}
````

We execute our test again and we get this

![screen][screen17]

So, as you can see, we can create tests to achieve test automatization with our modules and components.

Also, we can test our react components to make sure they behave as expected. To do this, we need to create a test like this:

````javascript
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import createComponent from 'react-unit';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
const test = addAssertions(tape, {jsxEquals});

//Our react component we will use for test purposes
class Button extends React.Component {
  render() {
    return <button className="test-button">Im a button</button>;
  }
}

test('it should render a button component', t => {
  //with this way we will render our component and its children
  const renderer = createRenderer();
  renderer.render(<Button />);
  const fullComponent = renderer.getRenderOutput();

  //this is other way to do it, but it just renders the component alone
  const shallowComponent = createComponent.shallow(<Button />);

  t.equal(shallowComponent.props.className, 'test-button', 'it does not have a text-button className');
  t.equal(shallowComponent.text, 'Im a button', `it shows ${shallowComponent.text} instead of Im a button`);

  t.equal(fullComponent.props.className, 'test-button', 'it does not have a text-button className');
  t.equal(fullComponent.props.children, 'Im a button', `it shows ${fullComponent.props.children} instead of Im a button`);

  t.end();
});
````

For this test, this execution should be similar to this

![screen][screen18]

So, it should be our main priority create automatic tests to make our code healthier and if we need to do some changes in our code, the tests will tell us if we are creating a new bug or does not meet the previous requirements.


[es-syntax-source]:http://es6-features.org/#Constants
[node-js-source]:https://nodejs.org/en/download/stable/
[react-essential-setup-source]:https://gist.github.com/aether7/05a8ece21ae6775ce8d6
[flux-vs-mvc-source]:http://www.pro-tekconsulting.com/blog/wp-content/uploads/2015/07/FLUX-vs-MVC.jpg
[wiki-mvc-source]:https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
[mvc-source-0]:https://manojjaggavarapu.files.wordpress.com/2012/05/mvcbase.png
[mvc-source-1]:https://cdn-images-1.medium.com/max/800/1*gSSDaoZsDB-dZGKqnVk1gQ.jpeg
[flux-source]:https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png
[race-condition-source]:https://en.wikipedia.org/wiki/Race_condition
[gulp-api-source]:https://github.com/gulpjs/gulp/blob/master/docs/API.md
[javascript-design-patterns-source]:https://addyosmani.com/resources/essentialjsdesignpatterns/book/
[sass-guide-source]:http://sass-lang.com/guide
[screen01]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen01.png
[screen02]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen02.png
[screen03]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen03.png
[screen04]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen04.png
[screen05]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen05.png
[screen06]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen06.png
[screen07]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen07.png
[screen08]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen08.png
[screen09]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen09.png
[screen10]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen10.png
[screen11]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen11.png
[screen12]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen12.png
[screen13]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen13.png
[screen14]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen14.png
[screen15]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen15.png
[screen16]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen16.png
[screen17]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen17.png
[screen18]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen18.png
