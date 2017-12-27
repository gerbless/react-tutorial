# Props and States

With the current implementation of our React components, they are not as reusable as we want, because we have many hardcoded values in them. However, we can refactor them to make more reusable sending to them the properties they need. These properties are know as props.

## Props

Props are attributes we can send to any React component, just like we assign HTML attributes to HTML elements.

E.g. if we want to send to our UserAvatar component some properties to work with, we can do it like this

```javascript
// instead of just write this
<UserAvatar />

// we send attributes that can be used in a react component
<UserAvatar
  url="http://placehold.it/350.jpeg&text=Kermit+the+frog+token"
  age={21}
  hidden={false}
  suggestions={['cats', 'lemon', 'rain', 'soccer', 'beach']}
  userPreferences={{maxResults: 3, backgroundColor: '#eaeaea', autoRefresh: false}}
/>
```

**NOTE** I must highlight one thing, just strings can be sent between quotation marks, the other data types must be between brackets. That is because the enclosing brackets evaluate the values within them.

So, we will refactor our UserAvatar component to change our hardcoded to this

```javascript
class UserAvatar extends React.Component {
  render() {
    //we can access to url property via this.props
    return <img src={this.props.url} />;
  }
}

//then we can send it the right url via url attribute
<UserAvatar url="http://placehold.it/350.jpeg&text=Kermit+the+frog+token" />
```

Also, we change all the harcoded values from React components, replacing them with our new way of passing data

```javascript
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
            <UserAvatar url="http://placehold.it/350.jpeg&text=Kermit+the+frog+token" />
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
```

As you can see, the URL we want to send to React component is harcoded inside our component. To avoid this, we can keep delegating the properties we want to our parent component and so on.

After all the refactor, we can be proud of ourselves an look our code below

```javascript
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
  avatarURL: 'http://placehold.it/350.jpeg&text=Kermit+the+frog+token'
};

//we have delegated all the properties to our root component
//yes, we can also retrieve all the attributes we need in a property
ReactDOM.render(<ExampleApp user={user} />, document.getElementById('app'));
```

With this, the parent components can share data with children components. They can send properties to children components, and these can use them as they want.

**NOTE** The most important thing about props is they are immutable data. This means, this properties sent by parent components their children **can not modify them**.

## State

Just using properties, we always will be dependant that a parent component gives us all the properties we need. So with this in case mind we have some issues

1. What happens when this component does not have a parent component(like ExampleApp) ?
1. What happens when I want to keep some app state, but props are immutable ?

For these cases, we can also have other special attribute called state. As its name indicates, it can keep internal app/component state.

With this in mind, we can refactor our ExampleApp component to this one

```javascript
class ExampleApp extends React.Component {
  //to create initial state data we must define a constructor method inside our react component
  constructor(props) {
    //we need to call this function to keep things working as expected
    super(props);

    //this is the state object we can keep our state for this component
    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'http://placehold.it/350.jpeg&text=Kermit+the+frog+token'
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
```

The most important thing about state is when it changes, the component will be re rendered,
to show the new data. When this happens, the parent component will be rendered again and their child as well

To make this happen, we need to call a special method called `setState` and must be used as below

```javascript
//as an argument, we can send the new state of our app/component
this.setState(newState);
```

When this happens, the component will be ordered to render again. Now, to show you an example of this, we can add a little code here and there to our current codebase.

```javascript
class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: 'Kermit the frog',
        role: 'CEO',
        salary: '250,000',
        description: 'This is kermit, our CEO',
        avatarURL: 'http://placehold.it/350.jpeg&text=Kermit+the+frog+token'
      }
    };

    //we simulate a state change after 3.5 secs
    setTimeout(() => {
      //to our user property we will assign him a new salary and role
      this.setState({
          user: Object.assign({}, this.state.user, {
              salary: '550,000',
              role: 'president'
          })
      });
    }, 3500);
  }
```

With this, we can store internal state to our app, and also we can send properties to our child components.
