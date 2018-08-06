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
            <UserAvatar url={this.props.user.avatarURL} onClick={this.props.handleClick}/>
            </div>
            <div className="UserProfile-container">
            <UserData
                 name={this.props.user.name}
                 role={this.props.user.role}
                 salary={this.props.user.salary}
            />
            </div>
          </div>
          <div>{this.props.description}</div>
        </article>
      );
    }
  }
  export default UserProfile;
