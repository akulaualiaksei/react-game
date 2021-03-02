import React, { Component } from 'react';
import './app.css';

import Cards from '../cards/cards';
import CardsList from '../cards-list/cards-list';
import Header from '../header/header';

export default class App extends Component {

  cardsData = Cards();
  state = {
    // cardsData: Cards(),
    // countTry: 0,
  }
  // flipCard = (index) =>{
  //   this.setState({
  //     flipped: !flipped
  //   })
  // }

  render() {
    const {countTry} = this.state;
    console.log(countTry);
    return(
      <React.Fragment>
      <Header countTry/>
      <CardsList
        getData={this.cardsData}
      />
      </React.Fragment>
    )
    // const elements = this.state.cardsData.
    // Cards().
    // map((item, index) => {
    //   return (

    //     <div
    //       // className={`card
    //       // ${isFlipped ? "flipped": ""}
    //       // `}
    //       className={`card ${item.flipped ? 'flipped': ''}`}
    //       key={index}
    //       onClick={() => flipCard(index)}
    //       >
    //         <div
    //           className="card-front"
    //           style={{
    //             backgroundImage: "url(./back.png)",
    //             backgroundRepeat: 'no-repeat',
    //             backgroundSize: 'center center cover'
    //             }}>

    //         {/* <img
    //             src="./back.png"
    //             alt="back"
    //             // width="100%"
    //             /> */}
    //         </div>
    //         <div className="card-back">
    //           <img
    //             src={`./${item.image}`}
    //             alt={`${item.name}`}
    //             width="100%"/>
    //         </div>
    //       {`${item.name} fl:${item.flipped}`}
    //     </div>
    //   )
    // })
    // return(
    //   <div className="cards">
    //     {elements}
    //   </div>
    // )

  }
};
