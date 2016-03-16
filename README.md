# React Tutorial

1. [ES2015 Syntax](#es2015-syntax)
1. [What is React](#what-is-react)
1. [Pros vs Cons](#pros-vs-cons)
1. [Preparing the Environment](#preparing-the-environment)
1. [Environment description](#environment-description)
1. [My first component](#my-first-component)
1. [Thinking in components](#thinking-in-components)
1. [Props and States](#props-and-states)
1. [Event handling](#event-handling)
1. [Modules](#modules)
1. [Real example](#real-example)
1. [Flux vs MVC](flux/readme.md)
1. [Browserify and Webpack](#browserify-and-webpack)
1. [Gulp](gulp/readme.md)
1. [CSS Preprocessors](css-preprocessors/readme.md)
1. [Unit tests](unit-tests/readme.md)
1. [Functional programming](functional-programming/readme.md)
1. [Object Oriented Programming](object-oriented-programming/readme.md)


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

To refer this section please follow the link below

[Flux vs MVC](flux/readme.md)


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


## GULP

To check this section, please follow the link below

[Gulp](gulp/readme.md)


## CSS Preprocessors

If you want to know a little more about what they are and why they are useful plase visit
the link below

[CSS Preprocessors](css-preprocessors/readme.md)


## Unit tests

Refer this section in the link below

[Unit tests](unit-tests/readme.md)


## Functional programming

If you want to know what is about this functional programming trendy is spreading over internet, check this link below

[Functional programming](functional-programming/readme.md)


## Object oriented programming

Objects, how they work in javascript with the Prototypal inheritance, link below

[Object Oriented Programming](object-oriented-programming/readme.md)


[es-syntax-source]:http://es6-features.org/#Constants
[node-js-source]:https://nodejs.org/en/download/stable/
[react-essential-setup-source]:https://gist.github.com/aether7/05a8ece21ae6775ce8d6
[screen01]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen01.png
[screen02]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen02.png
[screen03]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen03.png
[screen04]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen04.png
[screen05]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen05.png
[screen06]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen06.png
[screen07]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen07.png
[screen08]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen08.png
[screen09]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen09.png
[screen12]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen12.png
[screen13]:https://dl.dropboxusercontent.com/u/18850435/tutorial/screen13.png
