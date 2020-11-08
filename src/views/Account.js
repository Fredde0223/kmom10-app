import React from 'react';

class Account extends React.Component {
  state = {
    addedBalance: ''
  };

  async componentDidMount() {
    const url = "http://localhost:8333/accounts";
    const response = await fetch(url, {method: "GET", headers: {'x-access-token': localStorage.token, email: localStorage.email}});
    const result = await response.json();
    this.setState({
        email: result.data[0].email,
        balance: result.data[0].balance,
        gold: result.data[0].gold,
        silver: result.data[0].silver,
        copper: result.data[0].copper,
        iron: result.data[0].iron,
        aluminium: result.data[0].aluminium
    });
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    fetch('http://localhost:8333/accounts', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': localStorage.token
        },
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
    event.preventDefault();

    this.setState({balance: parseInt(this.state.balance) + parseInt(this.state.addedBalance)});
    this.setState({addedBalance: ''});
  }

  render () {
    if (localStorage.token) {
      return (
        <div>
          <div>
            <h1>Account info</h1>
            <p>Account email: {this.state.email}</p>
            <p>Current balance: {this.state.balance} kr</p>
            <p>Gold owned: {this.state.gold} g</p>
            <p>Silver owned: {this.state.silver} g</p>
            <p>Copper owned: {this.state.copper} g</p>
            <p>Iron owned: {this.state.iron} g</p>
            <p>Aluminium owned: {this.state.aluminium} g</p>
          </div>
          &nbsp;
          <form onSubmit={this.handleSubmit}>
            <div>
              <p>Add balance (kr):</p>
              <input type="number" value={this.state.addedBalance} name="addedBalance" onChange={this.handleChange} />
            </div>
            <div>
              <input type="submit" value="Confirm transaction"></input>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Account info</h1>
          <p>You are not logged in yet.</p>
        </div>
      );
    }
  }
};

export default Account;
