import React from 'react';
import { withRouter } from 'react-router';

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = async (event) => {
    const that = this;

    event.preventDefault();

    await fetch('http://localhost:8333/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      }).then(function(result) {
        if (result.data) {
          localStorage.setItem('email', that.state.email);
          localStorage.setItem('token', result.data.token);
        }
      });

    this.props.history.push('/account');
}

  render() {
    return (
      <div>
        <h1>Login</h1>
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
            <input type="submit" value="Login"></input>
          </div>
        </form>
      </div>
    )
  }
};

export default withRouter(Login);
