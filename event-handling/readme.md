# Event handling

When we want to handle some event over a React component, we can achieve that without effort. To handle events in ReactJS, they must be written in this way

```javascript
//each event must be written in camelcase
<UserAvatar onClick={eventHandler} onMouseOver={anotherEventHandler} />
```

To add this to our former example, we can catch when some user presses avatar image, this action will display an alert which notify that action to our user.

```javascript
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
```

The, when our user pressed the avatar images it will activate the alert. It is important to mention here, that we can also create event that children components can receive and do something.

Following the same example above, we can also achieve that in this way(the other code will be omitted by the sake of brevity)

```javascript
class UserAvatar extends React.Component {
  render() {
    //here, we receive from our props the onClick event we want to trigger
    return <img src={this.props.url} onClick={this.props.onClick} />;
  }
}

class UserProfile extends React.Component {
  render(){
    return (
      <article className="user-profile">
        <h3>User Profile</h3>
        <div>
          <div className="user-profile__container">
            <UserAvatar
                url={this.props.user.avatarURL}
                onClick={this.props.handleClick} />
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
  handleClick() {
    alert('hey listen, you are click over my image!');
  }

  render() {
    return (
      <UserProfile handleClick={this.handleClick} />
    );
  }
```
