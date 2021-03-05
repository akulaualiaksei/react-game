import React, {Component} from 'react';

import CardsList from '../cards-list/cards-list';
import Header from '../header/header';
import Cards from '../cards/cards';
import Footer from '../footer/footer';
import PlayAudio from '../audio/audio';

export default class Game extends Component {

  getCardsData = (num) => Cards(num);
  // constructor(props) {
  //   super(props);
    // this.state = {
    state = {
      boardSize: 0,
      itemList: this.getCardsData(),
      countClicks: 0,
      countDone: 0,
      timeRemaining: 0,
      gameStarted: false,
      difficulty: 0,
      background: 0,
      isAudioOn: true,
      audioVolume: 1,
      autoplay: false,
    };
    playAudio = new PlayAudio(
      this.state.isAudioOn,
      this.state.audioVolume,
    );
  // }


  boardSizeArray= [10, 5];
  difficulties= [80, 40];
  bgImage = ['./bg1.jpg', './bg2.jpg'];
  IntervalId = null;
  // boardSize = boardSize[2];
  // getCardsData = (number) => Cards(number);

  componentDidUpdate() {
    this.writeLocalStorage();

    if (this.state.autoplay) {
      this.autoPlayStepTimeOut = setTimeout(this.autoPlayStep, 5000);
    }
  }

  componentDidMount() {
    const localStorageState = localStorage.getItem('state');
    const localStorageIndexes = localStorage.getItem('indexes');
    // const bgAudio = new Audio('./bg.mp3');
    // bgAudio.play();
    if (localStorageState !== null){
      this.getFromLocalStorage(localStorageState, localStorageIndexes);
    }
    // this.playAudio.startBg();
    this.hotKeys();
  }

  checkedIndex = [];
  doneIndex = [];

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
    if (gameStarted) {
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
      this.initialInterval();
    }



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

  removeLocalStorage = () => {
    localStorage.removeItem('indexes');
    localStorage.removeItem('state');
    console.log('remove ls')
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
      const cardData = this.getCardsData(this.boardSizeArray[this.state.boardSize]);
      const time = this.difficulties[this.state.difficulty];
      console.log('time',time);
      console.log('time d',this.state.difficulty);
      console.log('time item',this.difficulties[this.state.difficulty]);
      return {gameStarted: true,
        itemList: cardData,
        countClicks: 0,
        countDone: 0,
        timeRemaining: time
      }
    });
    this.initialInterval();
    this.playAudio.startBg();
  }

  resetGame = () => {
    clearInterval(this.IntervalId);
    this.IntervalId = null;
    this.setState(() => {
      return {
        gameStarted: false,
        countClicks: 0,
        countDone: 0,
        timeRemaining: 0,
      };
    })

    console.log('remove from reset')
    this.removeLocalStorage();
    this.doneIndex = [];
    this.checkedIndex = [];
    this.playAudio.stopBg();
  }

  endGame = () => {
    // const loseGame = new Audio('./lose.wav');
    // loseGame.play();
    this.playAudio.lose();
    this.resetGame();
    this.playAudio.stopBg();
    // setTimeout()
    alert('You lose')

  }

  setTimer = () => {
    // console.log(this.IntervalId);

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
      this.isWin();
    }
  }

  isWin = () => {

    if (this.doneIndex.length === this.state.itemList.length) {
      // const winGame = new Audio('./success.wav');
      // winGame.play();
      this.playAudio.win();
      // this.componentWillUnmount();
      console.log('from win game', this.IntervalId)
      clearInterval(this.IntervalId);
      this.setGameStarted(false);
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 5000);
      console.log('remove from win')
      this.removeLocalStorage();
      this.doneIndex = [];
      this.checkedIndex = [];
      this.playAudio.stopBg();
      alert('you win');

    }
  }

  checkCards = () => {
    const {itemList, countDone} = this.state;
    const firstChecked = itemList[this.checkedIndex[0]];
    const secondChecked = itemList[this.checkedIndex[1]];
    if (firstChecked === undefined || secondChecked === undefined) return;
    if (firstChecked.id === secondChecked.id) {
      // const correctAudio = new Audio('./correct.wav');
      // correctAudio.play();
      this.playAudio.correct();
      this.checkedIndex = [];
      this.doneIndex = [...this.doneIndex, firstChecked.key, secondChecked.key];
      // this.isWin();

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
      // const wrongAudio = new Audio('./wrong.mp3');
      // wrongAudio.play();
      this.playAudio.wrong();
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
    this.isWin();
  }

  addCheckCards = (index) => {

    this.checkedIndex.push(index);

    if (this.checkedIndex.length > 1) {
      setTimeout(this.checkCards, 600);
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
    // console.log(this.state.itemList[index]);

    this.setState((state) => {
      const items = this.toggleProperty(state.itemList, index, 'flipped');
      const countClicks = state.countClicks + 1;
      return {itemList:items,
      countClicks: countClicks}
    });
    // const flipAudio = new Audio('./flip.wav');
    // flipAudio.play();
    this.playAudio.flip();
  }

  changeBoardSize = () => {
    const oldBs = this.state.boardSize;
    const newBs = oldBs === 0 ? 1 : 0;
    this.resetGame();
    this.setState(({boardSize}) => {
      const newItemList = this.getCardsData(this.boardSizeArray[newBs]);
      return {boardSize: newBs,
      itemList: newItemList};
    })
  }

  changeBgImage = () => {
    const oldBg = this.state.background;
    const newBg = oldBg === 0 ? 1 : 0;
    this.setState(({background}) => {
    return {background: newBg};
  }, ()=>{console.log(this.state.background)})
  }

  changeDifficulties = () => {
    const oldDiff = this.state.difficulty;
    const newDiff = oldDiff === 0 ? 1 : 0;
    console.log('before', this.state.difficulty);
    this.resetGame();
    this.setState(({difficulty}) => {
    return {difficulty: newDiff};
  })
  console.log('after', this.state.difficulty);
  }

  returnBgImage = () => {
    return this.bgImage[this.state.background]
  }

  audioToggle = () => {
    this.playAudio.toggleAudio();
  }

  soundUp = () => {
    this.playAudio.audioUp();
  }

  soundDown = () => {
    this.playAudio.audioDown();
  }

  toggleAutoPlay = () => {
    const oldAP = this.state.difficulty;
    const newAP = oldAP ? false : true;
    console.log('before', this.state.difficulty);
    this.resetGame();
    this.setState(({autoplay}) => {
    return {autoplay: newAP};
    });
  }

//   autoPlayStep = async () => {
//     const {itemList} = this.state;
// // debugger
//     let firstCard = itemList.find((item) => !item.flipped && !item.done);
//     this.firstFlip = await setTimeout(() => {this.onCardClick(firstCard.key);}, 1);
//     // this.firstFlip = await this.onCardClick(firstCard);
//     let secondCard = itemList.find((item) => item.key !== firstCard.key && item.id === firstCard.id);
//     // this.secondFlip = await this.onCardClick(secondCard);
//     this.secondFlip = await setTimeout(() => {this.onCardClick(secondCard.key);},3000);
//   }

  AutoPlay = () => {
    // this.startGame();

    this.toggleAutoPlay();
    // setInterval(autoClick, 1100);
  }

  hotKeys = () => {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'KeyN') {
        // debugger;
        this.startGame()
      }
      if (event.code === 'KeyB') {
        // debugger;
        this.changeBoardSize()
      }
      if (event.code === 'KeyI') {
        // debugger;
        this.changeBgImage()
      }
      if (event.code === 'KeyT') {
        // debugger;
        this.changeDifficulties()
      }
      if (event.code === 'KeyS') {
        // debugger;
        this.audioToggle()
      }
    });
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
          buttonLabelDifficulties={'Change time'}

          onClickBgImage={this.changeBgImage}
          buttonLabelBgImage={'Change BgImage'}

          onClickAutoPlay={this.AutoPlay}
          buttonLabelAutoPlay={'AutoPlay'}

          onClickAudioToggle={this.audioToggle}
          buttonLabelAudioToggle={'Switch sound'}

          onClickSoundUp={this.soundUp}
          buttonLabelSoundUp={'Up sound'}

          onClickSoundDown={this.soundDown}
          buttonLabelSoundDown={'Down sound'}
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
        <Footer/>
        </div>

      // </React.Fragment>
    );
  }

  }

