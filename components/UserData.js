// with this we can import React to use it
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
              <td>$ {this.props.salary}  USD per year</td>
            </tr>
          </tbody>
        </table>
      );
    }
  }
  export default UserData;
