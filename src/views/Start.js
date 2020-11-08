import React from 'react';
import { withRouter } from 'react-router';

class Start extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    localStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    if (localStorage.token) {
      return (
        <div>
          <div>
            <h1>Welcome</h1>
            <p>This is a trading platform for different kinds of metals.</p>
            <p>To be able to trade you need to make an account and log in.</p>
            &nbsp;
            <p>Status: You are logged in, log out here.</p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input type="submit" value="Log out"></input>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Welcome</h1>
          <p>This is a trading platform for different kinds of metals.</p>
          <p>To be able to trade you need to make an account and log in.</p>
          &nbsp;
          <p>Status: You are not yet logged in.</p>
        </div>
      );
    }
  }
};

export default withRouter(Start);
