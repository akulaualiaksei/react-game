import React, { Component } from 'react';
import './app.css';

// import Cards from '../cards/cards';
import Game from '../game/game';

export default class App extends Component {

  // cardsData = Cards();
  state = {
    // cardsData: Cards(),
    // countTry: 0,
  }

  render() {
    return(
      <Game
        // getData={this.cardsData}
      />
    )
  }
};
