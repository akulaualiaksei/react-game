import React, {Component} from 'react';

import CardsList from '../cards-list/cards-list';
import Header from '../header/header';
// import PlayAudio from '../audio/audio';

export default class Game extends Component {

  state = {
    itemList: this.props.getData,
    countClicks: 0,
    countDone: 0,
    time: 0,
    timeRemaining: 120,
  };
  checkedIndex = [];
  doneIndex = [];
  IntervalId = null;

  componentDidMount() {
    this.IntervalId = setInterval(this.setTimer, 1000);
  }

  setTimer = () => {

    this.setState((state) => {
      const time = state.timeRemaining -1;
      console.log(time);
      return {timeRemaining: time}
    },()=>{
      if (this.state.timeRemaining === 0) {
      clearInterval(this.IntervalId);
    }})
  }

  componentWillUnmount() {
    clearInterval(this.IntervalId);
  }

  onCardClick = (index) => {
    const {
      itemList
    } = this.state;
    console.log(itemList[index]);
    if (this.checkedIndex.length >1 ) return;
    this.flipCard(index);
    this.addCheckCards(index);
    if (this.doneIndex.length === itemList.length) {
      console.log('win');
    }
    console.log('doneIndex', this.doneIndex, 'itemList', itemList)
  }

  isWin = () => {

    if (this.doneIndex.length === this.state.itemList.length) {
      console.log('win');
      const winGame = new Audio('./success.wav');
      winGame.play();
      this.componentWillUnmount();
      setTimeout(() => {
        window.location.reload(false);
      }, 5000);

    }
  }

  addCheckCards = (index) => {
    const {itemList, countDone} = this.state;

    this.checkedIndex.push(index);

    console.log(this.checkedIndex);

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
  render() {
    const {itemList, countClicks, countDone, timeRemaining} = this.state;
    console.log('frm game', itemList);
    console.log('frm game', this.state);

    return(
      <React.Fragment>
        <Header
          countClicks={countClicks}
          countDone={countDone}
          timeRemaining={timeRemaining}
        />
        <CardsList
          itemList={itemList}
          onClick={(i)=> this.onCardClick(i)}
        />
      </React.Fragment>
    );
  }

  }

