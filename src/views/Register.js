import React from 'react';
import { withRouter } from 'react-router';

class Register extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  fetch1 = data => {
    fetch('https://proj-api.frah19.me/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response)
      return response.json();
    });
  }

  fetch2 = data => {
    fetch('https://proj-api.frah19.me/accounts', {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(data)
    }).then(function(response) {
      console.log(response)
      return response.json();
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = this.state;
    await this.fetch1(data);
    await this.fetch2(data);
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <p>Email:</p>
            <input type="email" value={this.state.value} name="email" onChange={this.handleChange} />
          </div>
          <div>
            <p>Password:</p>
            <input type="password" value={this.state.value} name="password" onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Register"></input>
          </div>
        </form>
      </div>
    )
  }
};

export default withRouter(Register);
