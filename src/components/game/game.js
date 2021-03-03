import React, {Component} from 'react';

import CardsList from '../cards-list/cards-list';
import Header from '../header/header';
import Cards from '../cards/cards';
// import PlayAudio from '../audio/audio';

export default class Game extends Component {

  boardSizeArray= [4, 8, 10];
  difficulties= [40, 80, 40];
  bgImage = ['./bg1.jpg', './bg2.jpg', './bg3.jpg'];
  // boardSize = boardSize[2];
  // getCardsData = (number) => Cards(number);
  getCardsData = () => Cards();

  componentDidUpdate() {
    this.writeLocalStorage();
    if(this.state.gameStarted && this.IntervalId === null) {
      this.IntervalId = setInterval(this.setTimer, 1000);
    }
  }

  componentDidMount() {
    const localStorageState = localStorage.getItem('state');
    const localStorageIndexes = localStorage.getItem('indexes');
    if (localStorageState !== null){
      this.getFromLocalStorage(localStorageState, localStorageIndexes);
    }
  }

  state = {
    // itemList: Cards(),
    boardSize: 0,
    itemList: this.getCardsData(),
    countClicks: 0,
    countDone: 0,
    timeRemaining: 0,
    gameStarted: false,
    difficulty: 0,
    background: 0,
  };
  checkedIndex = [];
  doneIndex = [];

  IntervalId = null;

  initialGame = ({
    boardSize,
    itemList,
    countClicks,
    countDone,
    timeRemaining,
    gameStarted,
    difficulty,
    background,
  }, indexesObj ) => {
    // TODO if data from ls
    if (indexesObj !== null) {
      this.checkedIndex = indexesObj.checkedIndex;
      this.doneIndex = indexesObj.doneIndex;
    }
    this.setState((state) => {
      return{
        boardSize,
        itemList,
        countClicks,
        countDone,
        timeRemaining,
        gameStarted,
        difficulty,
        background,
      }
    }, () => {console.log(this.state.gameStarted)})



  }

  writeLocalStorage = () => {
    const currState = this.state;

    if (typeof currState === 'object' && currState !== null) {
    localStorage.setItem('state', JSON.stringify(currState));
  }
    localStorage.setItem('indexes', JSON.stringify({
      checkedIndex: this.checkedIndex,
      doneIndex: this.doneIndex,
    }));
  }



  getFromLocalStorage = (state, indexes) => {
    const stateObj = JSON.parse(state);
    const indexesObj = JSON.parse(indexes);
    this.initialGame(stateObj, indexesObj);
  }

  initialInterval = () => {
    this.IntervalId = setInterval(this.setTimer, 1000);
  }

  setGameStarted = (bool) => {
    this.setState(({gameStarted}) => {
      return{gameStarted: bool}
    })
  }

  startGame = (isStart = true) => {
    clearInterval(this.IntervalId);
    this.setState((state) => {
      // const cardData = this.getCardsData(this.boardSize);
      const cardData = this.getCardsData();
      const time = this.difficulties[this.state.difficulty];
      return {gameStarted: true,
        itemList: cardData,
        countClicks: 0,
        countDone: 0,
        timeRemaining: time
      }
    });
    this.IntervalId = this.initialInterval();
  }

  endGame = () => {
    clearInterval(this.IntervalId);
    this.setState(() => {
      return {
        gameStarted: false,
        countClicks: 0,
        countDone: 0,
      };
    })
    alert('You lose')
  }

  setTimer = () => {

    this.setState((state) => {

      let time = state.timeRemaining -1;
      if (time < 0) time = 0;
      return {timeRemaining: time}
    },()=>{
      if (this.state.timeRemaining === 0) {
        this.endGame();
    }})
  }

  componentWillUnmount() {
    clearInterval(this.IntervalId);
    this.IntervalId = null;
  }

  onCardClick = (index) => {
    const {
      itemList,
      gameStarted
    } = this.state;
    if (!gameStarted) return;
    // console.log('assd ok')
    if (this.checkedIndex.length >1 ) return;
    this.flipCard(index);
    this.addCheckCards(index);
    if (this.doneIndex.length === itemList.length) {
    }
  }

  isWin = () => {

    if (this.doneIndex.length === this.state.itemList.length) {
      const winGame = new Audio('./success.wav');
      winGame.play();
      this.componentWillUnmount();
      alert('You win');
      setTimeout(() => {
        window.location.reload(false);
      }, 5000);

    }
  }

  addCheckCards = (index) => {
    const {itemList, countDone} = this.state;

    this.checkedIndex.push(index);

    if (this.checkedIndex.length > 1) {

      const checkCards = () => {
        const firstChecked = itemList[this.checkedIndex[0]];
        const secondChecked = itemList[this.checkedIndex[1]];
        if (firstChecked.id === secondChecked.id) {
          const correctAudio = new Audio('./correct.wav');
          correctAudio.play();
          this.checkedIndex = [];
          this.doneIndex = [...this.doneIndex, firstChecked.key, secondChecked.key];
          this.isWin();

          this.setState((state) => {
            const firstIndex = state.itemList.findIndex((item) => item.key === firstChecked.key);
            const secondIndex = state.itemList.findIndex((item) => item.key === secondChecked.key);

            const firstEdit = { ...firstChecked,
              checked: false,
              done: true,
              flipped: true,
            }

            let newItemList = [
              ...state.itemList.slice(0, firstIndex),
              firstEdit,
              ...state.itemList.slice(firstIndex+1)
            ]
            const secondEdit = { ...secondChecked,
              checked: false,
              done: true,
              flipped: true,
            }

            newItemList = [
              ...newItemList.slice(0, secondIndex),
              secondEdit,
              ...newItemList.slice(secondIndex+1)
            ]

            return{
              itemList: newItemList,
              countDone: countDone + 1,
            };

          })
        } else {
          const wrongAudio = new Audio('./wrong.mp3');
          wrongAudio.play();
          this.setState((state) => {

            const firstIndex = state.itemList.findIndex((item) => item.key === firstChecked.key);
            const secondIndex = state.itemList.findIndex((item) => item.key === secondChecked.key);

            const firstEdit = { ...firstChecked,
              checked: false,
              done: false,
              flipped: false,
            }

            let newItemList = [
              ...state.itemList.slice(0, firstIndex),
              firstEdit,
              ...state.itemList.slice(firstIndex+1)
            ]
            const secondEdit = { ...secondChecked,
              checked: false,
              done: false,
              flipped: false,
            }

            newItemList = [
              ...newItemList.slice(0, secondIndex),
              secondEdit,
              ...newItemList.slice(secondIndex+1)
            ]

            return{itemList: newItemList};
          })
          this.checkedIndex =[];
        }
      }
      setTimeout(checkCards, 600);

    }

  };

  toggleProperty = (array, key, propName) => {
    const index = array.findIndex((item) => item.key === key);
    const oldItem = array[index];
    const value = !oldItem[propName];

    const item = { ...array[index], [propName]: value } ;

    return [
      ...array.slice(0, index),
      item,
      ...array.slice(index + 1)
    ];
  };

  flipCard = (index) => {
    console.log(this.state.itemList[index]);

    this.setState((state) => {
      const items = this.toggleProperty(state.itemList, index, 'flipped');
      const countClicks = state.countClicks + 1;
      return {itemList:items,
      countClicks: countClicks}
    });
    const flipAudio = new Audio('./flip.wav');
    flipAudio.play();
  }

  changeBoardSize = () => {
    this.setState(({boardSize}) => {
        let newItem = boardSize ++;
        if (newItem === 3) {
          let newItem = 0;
        }
      return {boardSize: newItem};
    })
  }

  changeBgImage = () => {
    this.setState(({background}) => {
      // console.log('sa',background);
      let newItem = background ++;

      // console.log('aft',background);
      // console.log('afta',background);
      if (newItem === 3) {
        let newItem = 0;
      }
    return {background: newItem};
  }, ()=>{console.log(this.state.background)})
  }

  changeDifficulties = () => {
    this.setState(({difficulty}) => {
      let newItem = difficulty ++;
      if (newItem === 3) {
        let newItem = 0;
      }
    return {difficulty: newItem};
  })
  }

  returnBgImage = () => {
    return this.bgImage[this.state.background]
  }

  // autoClick = () => {
  //   this.state.itemList.
  // }
  AutoPlay = () => {
    this.startGame();
    // setInterval(autoClick, 1100);
  }



  render() {
    const {
      itemList,
      countClicks,
      countDone,
      timeRemaining,
      gameStarted,
      background
    } = this.state;
    // console.log(background);

    return(
      // <React.Fragment>
      <div
        className='app'
        style= {{
          // backgroundImage:`url(${this.backgroundImage})`,
          backgroundImage:`url(./${this.returnBgImage()})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}
      >
        <Header
          countClicks={countClicks}
          countDone={countDone}
          timeRemaining={timeRemaining}

          onClickStartGame={this.startGame}
          buttonLabelStartGame={'Start Game'}

          onClickBoardSize={this.changeBoardSize}
          buttonLabelBoardSize={'Change Board Size'}

          onClickDifficulties={this.changeDifficulties}
          buttonLabelDifficulties={'change difficulty'}

          onClickBgImage={this.changeBgImage}
          buttonLabelBgImage={'change BgImage'}

          onClickAutoPlay={this.AutoPlay}
          buttonLabelAutoPlay={'AutoPlay'}
        />
          {/* //TODO Higher-Order Component, HOC */}
          {/* <Button
            handleClick={this.eventas}
            label={label}
          /> */}
        <CardsList
          itemList={itemList}
          onClick={(i)=> {
            this.onCardClick(i)}}
        />
        </div>
      // </React.Fragment>
    );
  }

  }

