import React from 'react';
import { withRouter } from 'react-router';

class Objectsell extends React.Component {
  state = {
      selected: null,
      amount: null,
  };

  handleChangeSelect = (event) => {
    event.preventDefault();
    this.setState({selected: event.target.value});
  }

  handleChangeInput = (event) => {
    event.preventDefault();
    this.setState({amount: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:8333/objects/sell', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': localStorage.token
        },
        body: JSON.stringify(this.state)
    }).then(async function(response) {
        await response.json();
      });

    event.preventDefault();
    await fetch('http://localhost:8333/accounts/sell', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': localStorage.token
        },
        body: JSON.stringify(this.state)
    }).then(async function(response) {
        await response.json();
      });

    this.props.history.push('/account');
  }

  async componentDidMount() {
    const objUrl = 'http://localhost:8333/objects';
    const objResponse = await fetch(objUrl, {method: "GET", headers: {'x-access-token': localStorage.token}});
    const objResult = await objResponse.json();
    this.setState({
        gold: objResult.data[0].gold,
        goldValue: objResult.data[0].goldValue,
        silver: objResult.data[0].silver,
        silverValue: objResult.data[0].silverValue,
        copper: objResult.data[0].copper,
        copperValue: objResult.data[0].copperValue,
        iron: objResult.data[0].iron,
        ironValue: objResult.data[0].ironValue,
        aluminium: objResult.data[0].aluminium,
        aluminiumValue: objResult.data[0].aluminiumValue
    });

    const accUrl = 'http://localhost:8333/accounts';
    const accResponse = await fetch(accUrl, {method: "GET", headers: {'x-access-token': localStorage.token, email: localStorage.email}});
    const accResult = await accResponse.json();
    this.setState({
        email: accResult.data[0].email,
        balance: accResult.data[0].balance,
        accGold: accResult.data[0].gold,
        accSilver: accResult.data[0].silver,
        accCopper: accResult.data[0].copper,
        accIron: accResult.data[0].iron,
        accAluminium: accResult.data[0].aluminium
    });
  }

  render() {
    if (localStorage.token) {
      return (
        <div>
          <h1>Sell objects</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <p>Choose object:</p>
              <select name="dropdown" id="dropdown" onChange={this.handleChangeSelect}>
                <option>Choose here... </option>
                <option>gold</option>
                <option>silver</option>
                <option>copper</option>
                <option>iron</option>
                <option>aluminium</option>
              </select>
            </div>
            <div>
              <p>Amount:</p>
              <input type="number" name="amount" onChange={this.handleChangeInput} />
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
          <h1>Sell objects</h1>
          <p>You are not logged in yet.</p>
        </div>
      );
    }
  }
};

export default withRouter(Objectsell);
