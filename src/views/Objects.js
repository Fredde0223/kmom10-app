import React from 'react';
import io from "socket.io-client";
const ENDPOINT = "https://proj-ss.frah19.me";
const valSocket = io(ENDPOINT);
const url = "https://proj-api.frah19.me/objects";

class Objects extends React.Component {
  state = {};

  async componentDidMount() {
    var exist = valSocket.hasListeners('interval');

    if (exist) {
      valSocket.off('interval');
    }

    valSocket.on('interval', async (valueArr) => {
      this.setState({
        goldValue: valueArr[0],
        silverValue: valueArr[1],
        copperValue: valueArr[2],
        ironValue: valueArr[3],
        aluminiumValue: valueArr[4]
      });

      const putResponse = await fetch(url, {method: "PUT", headers: {"Content-Type": "application/json; charset=utf-8"}, body: JSON.stringify(this.state)});
      await putResponse.json();

      const getResponse = await fetch(url, {method: "GET", headers: {'x-access-token': localStorage.token}});
      const getResult = await getResponse.json();

      this.setState({
        gold: getResult.data[0].gold,
        goldValue: getResult.data[0].goldValue,
        silver: getResult.data[0].silver,
        silverValue: getResult.data[0].silverValue,
        copper: getResult.data[0].copper,
        copperValue: getResult.data[0].copperValue,
        iron: getResult.data[0].iron,
        ironValue: getResult.data[0].ironValue,
        aluminium: getResult.data[0].aluminium,
        aluminiumValue: getResult.data[0].aluminiumValue
      });
    });

    const initResponse = await fetch(url, {method: "GET", headers: {'x-access-token': localStorage.token}});
    const initResult = await initResponse.json();
    this.setState({
      gold: initResult.data[0].gold,
      goldValue: initResult.data[0].goldValue,
      silver: initResult.data[0].silver,
      silverValue: initResult.data[0].silverValue,
      copper: initResult.data[0].copper,
      copperValue: initResult.data[0].copperValue,
      iron: initResult.data[0].iron,
      ironValue: initResult.data[0].ironValue,
      aluminium: initResult.data[0].aluminium,
      aluminiumValue: initResult.data[0].aluminiumValue
    });
  }

  render () {
    if (localStorage.token) {
      return (
        <div>
          <h1>Trading objects</h1>
          <div class="objbox gold">
            <p>Metal type: Gold</p>
            <p>Available amount: {this.state.gold} g</p>
            <p>Current price: {this.state.goldValue} kr</p>
          </div>
          <div class="objbox silver">
            <p>Metal type: Silver</p>
            <p>Available amount: {this.state.silver} g</p>
            <p>Current price: {this.state.silverValue} kr</p>
          </div>
          <div class="objbox copper">
            <p>Metal type: Copper</p>
            <p>Available amount: {this.state.copper} g</p>
            <p>Current price: {this.state.copperValue} kr</p>
          </div>
          <div class="objbox iron">
            <p>Metal type: Iron</p>
            <p>Available amount: {this.state.iron} g</p>
            <p>Current price: {this.state.ironValue} kr</p>
          </div>
          <div class="objbox aluminium">
            <p>Metal type: Aluminium</p>
            <p>Available amount: {this.state.aluminium} g</p>
            <p>Current price: {this.state.aluminiumValue} kr</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Trading objects</h1>
          <p>You are not logged in yet.</p>
        </div>
      );
    }
  }
};

export default Objects;
