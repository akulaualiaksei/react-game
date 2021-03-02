import React, {Component} from 'react';

// import CardItem from '../card-item/card-item';

import './card-list.css';

export default class ItemList extends Component {

  state = {
    itemList: null,
    // checkedCards: null,
    countTry: 0,
  };
  checkedIndex = [];
  doneIndex = [];

  componentDidMount() {
    const {getData} = this.props;
    console.log(getData);

    this.setState({
      itemList: getData
    });
  }

  onCardClick = (index) => {
    const {
      // checkedCards,
      itemList
    } = this.state;
    console.log(itemList[index]);
    // console.log('before',this.state.checkedCards);
    // if (checkedCards && checkedCards.length > 1) {
    //   return;
    // }
    if (this.checkedIndex.length >1 ) return;
    this.flipCard(index);
    this.addCheckCards(index);
    if (this.doneIndex.length === itemList.length) {
      console.log('win');
    }
    console.log('doneIndex', this.doneIndex, 'itemList', itemList)
    // console.log('after as', this.state.checkedCards)


  }

  addCheckCards = (index) => {
    // const oldCheckedCards = state.checkedCards;
    // this.setState(({checkedCards}) => {
    //   return {checkedCards: checkedCards? [...checkedCards, index]: [index]}
    // });
    const {itemList} = this.state;
    this.checkedIndex.push(index);
    console.log(this.checkedIndex);
    if (this.checkedIndex.length > 1) {
      // console.log(this.checkedIndex[0]);
      // const index = itemList.findIndex((item) => item.key === this.checkedIndex[0]);
      // console.log(index);
      // console.log(itemList[this.checkedIndex[0]])
      // console.log(itemList[this.checkedIndex[1]])
      const checkCards = () => {
        const firstChecked = itemList[this.checkedIndex[0]];
        const secondChecked = itemList[this.checkedIndex[1]];
        // if (itemList[this.checkedIndex[1]].id === itemList[this.checkedIndex[0]]) {
        if (firstChecked.id === secondChecked.id) {
          //setState done for 2
          this.checkedIndex = [];
          this.doneIndex = [...this.doneIndex, firstChecked.key, secondChecked.key];
          if (this.doneIndex.length === itemList.length) {
            alert('win');
          }
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

            return{itemList: newItemList};

          })
        } else {

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
          // const firstChange = this.toggleProperty(state.itemList, this.checkedIndex[0], 'flipped');
          // const sec = this.toggleProperty(state.itemList, this.checkedIndex[0], 'flipped');

          })
          this.checkedIndex =[];
        }
      }
      setTimeout(checkCards, 1000);

        // === this.state.ItemList[this.checkedIndex[1]].id);
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
      return {itemList:items}
    });

    // this.setState(({itemList, checkedCards}) =>{
    //   // const result = [
    //   let result = [
    //     ...itemList.slice(0,index),
    //     {...itemList[index],
    //     flipped: !itemList[index].flipped},
    //     ...itemList.slice(index+1)
    //   ];
    //   let newCheckedCards = checkedCards? [...checkedCards, index]: [index];
    //   console.log('checked cards', checkedCards);
    //   console.log('new CC', newCheckedCards);
    //   if (checkedCards> 1) {
    //     console.log(itemList[checkedCards[0]]);
    //     console.log(itemList[checkedCards[1]]);

    //     if (itemList[newCheckedCards[0]].id === itemList[newCheckedCards[1]].id) {
    //       console.log('+');
    //       newCheckedCards = null;
    //     } else {
    //       console.log('-');
    //       result = [
    //         ...itemList.slice(0,newCheckedCards[0]),
    //         {...itemList[newCheckedCards[0]],
    //         flipped: !itemList[newCheckedCards[0]].flipped},
    //         ...itemList.slice(newCheckedCards[0]+1)
    //       ];
    //       result = [
    //         ...itemList.slice(0,newCheckedCards[0]),
    //         {...itemList[newCheckedCards[1]],
    //         flipped: !itemList[newCheckedCards[1]].flipped},
    //         ...itemList.slice(newCheckedCards[1]+1)
    //       ];
    //       newCheckedCards = null;
    //     }
    //   }
    //   return {
    //     itemList: result,
    //     checkedCards: newCheckedCards
    //   };
    // })
  }

  renderItems(array) {
    return array.map(({id, name,flipped, image, key, done, checked}) => {
      let classNames = 'card';
      if (flipped) {
        classNames += ' flipped';
      }
      if (done) {
        classNames += ' done';
      }
      // if (checked) {
      //   classNames += ' checked';
      // }


      return (
        <div
          className={ classNames
            // `card${flipped ? ' flipped':''}${done ? ' done':''}${checked ? ' checked':''}`
          }
          key={key}
          // onClick={() => this.flipCard(key)}
          onClick={() => this.onCardClick(key)}
        >
            <div
              className="card-front"
              style={{
                backgroundImage:"url(./back.png)",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>{id}
              {/* <img
                src={`./back.png`}
              /> */}
            </div>
            <div
              className="card-back"
              style={{
                backgroundImage:`url(./${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              >
                {/* <img
                  src={`./${image}`}
                  alt={`${name}`}
                  /> */}
              </div>
        </div>
      )
    })
  }

  render() {
    const {itemList} = this.state;

    if (!itemList) {
      console.log(itemList);
      return <div>error</div>
    }

    const items = this.renderItems(itemList);

    return (
      <div
        className="cards"
      >
        {items}
      </div>
    );
  }
}
