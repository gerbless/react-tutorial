// with this we can import React to use it
import React from 'react';
// here we import our component from a module
// import ComponentName from 'relativePath';
import UserProfile from '../components/UserProfile';


class ExampleApp extends React.Component {  //to create initial state data we must define a constructor method inside our react component
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

    handleClick() {
        alert('hey listen, you are click over my image!');
      }

    render() {
      //instead of sending props data, we change that to use our internal state
      return <UserProfile user={this.state.user} handleClick={this.handleClick}/>;
    }
  }
  export default ExampleApp;
