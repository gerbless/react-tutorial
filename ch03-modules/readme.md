# Modules

Each time we add new React components or new features to our codebase, our single file will be growing bigger and so on. This in some point will make our code hard to maintain and hard to make refactors and changes.

To solve this issue, with the new Javascript version, we can use modules just like other languages do. This allow us split our code to smaller pieces and keep them as reusable as they can.

Let's return to our working example

```javascript
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
      <article className="user-profile">
        <h3>User Profile</h3>
        <div>
          <div className="user-profile__container">
            <UserAvatar url={this.props.user.avatarURL} />
          </div>
          <div className="user-profile__container">
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
        avatarURL: 'http://placehold.it/350.jpeg&text=Kermit+the+frog+token'
      }
    };

    //we simulate a state change after 3.5 seconds
    setTimeout(() => {
      //to our user we are going to assign him a new salary and a new role in the company
      this.setState({
        user: Object.assign({}, this.state.user, {
          salary: '550,000',
          role: 'president'
        })
      });
    }, 3500);
  }

  render() {
    return <UserProfile user={this.state.user} />;
  }
}

ReactDOM.render(<ExampleApp />, document.getElementById('app'));

```

This we will refactor to a more modular approach. The first thing we need to do is to create a component folder.
Then we will create the following files inside it.

- UserAvatar.js
- UserData.js
- UserProfile.js
- ExampleApp.js

Then we will copy our UserAvatar component in UserAvatar.js file, then we can delete the code from main.js. We need to repeat those steps with UserData and UserProfile.

After this, if we try to run the same code, we will get the following error:

![error][userprofileerror]

This occurs because now our app is split into multiple files and we are not importing the code properly. To make our example run as before, we need to refactor a just little bit these files.

So, we will begin with our UserAvatar.js file

```javascript
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
```

The one thing we can notice is we are adding the sentence `export default UserAvatar`. This is necessary to indicate that our UserAvatar component can be imported by other modules.

We do this same task inside UserProfile and UserData. Now, inside main.js code will be written like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
// here we import our component from a module
// import ComponentName from 'relativePath';
import UserProfile from '../components/UserProfile';

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'http://placehold.it/350.jpeg&text=Kermit+the+frog+token'
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
```

If we do this in our code, then in browser's console will output an error like this

![error][screen05]

This happens because in our module we do not have defined any dependency in it. In this case, we need to load ReactJS to use it. So, to import this dependency, we need to add just one more line to accomplish that

```javascript
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
```

Also, UserAvatar and UserData will need this same dependency, so add it in the same way as we did before.

After this, we can see how our react example will behave as before.

![screen][screen02]

Now, the one task left here is to copy our ExampleApp component into ExampleApp.js. If we do this, the code in ExampleApp.js will look as below

```javascript
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
        avatarURL: 'http://placehold.it/350.jpeg&text=Kermit+the+frog+token'
      }
    };

    setTimeout(() => {
      this.setState({
          user: {
              ...this.state.user,
              salary: '550,000',
              role: 'president'
          }
      });
    }, 3500);
  }

  render() {
    return <UserProfile user={this.state.user} />;
  }
}

export default ExampleApp;
```

When we finish this task, our main.js file should be like this one

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ExampleApp from './static/js/components/ExampleApp';

ReactDOM.render(<ExampleApp />, document.getElementById('example'));
```

Now, this error will be displayed in our console

![screen][screen06]

Please do not be afraid, this occurs because we have forgotten to change the import route of UserProfile component in ExampleApp.js, so we need to refactor it

```javascript
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
        avatarURL: 'http://placehold.it/350.jpeg&text=Kermit+the+frog+token'
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
```

Finally, our entire codebase should be this

```javascript
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
import UserProfile from '../components/UserProfile';

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'http://placehold.it/350.jpeg&text=Kermit+the+frog+token'
      }
    };

    setTimeout(() => {
      this.setState({
          user:{
              ...this.state.user,
              salary: '550,000',
              role: 'president'
          }
      });
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
import ExampleApp from './static/js/apps/ExampleApp';

ReactDOM.render(<ExampleApp />, document.getElementById('example'));
/********** main.js **********/
```

The project structure should look similar to this picture below

![structure][screen07]

[screen07]:../images/screen07.png
