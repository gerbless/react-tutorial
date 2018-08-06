// with this we can import React to use it
import React from 'react';
class UserAvatar extends React.Component {
    render() {
      return <img src={this.props.url} onClick={this.props.onClick}/>;
    }
  }
//we add this line that allow us to export this snippet of code to other modules
export default UserAvatar;
