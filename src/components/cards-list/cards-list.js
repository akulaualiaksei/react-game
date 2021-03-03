import React, {Component} from 'react';

import CardItem from '../card-item/card-item';

import './card-list.css';

export default class CardsList extends Component {

  renderItems(array) {
    return array.map((
      {
        id,
        // name,
        flipped,
        image,
        key,
        done,
        // checked
      }) => {
      let classNames = 'card';
      if (flipped) {
        classNames += ' flipped';
      }
      if (done) {
        classNames += ' done';
      }

      return (
        <div
          className={ classNames }
          key={key}
          onClick={() => this.props.onClick(key)}
        >
            <CardItem
            image={image}
            id={id}
            />
        </div>
      )
    })
  }

  render() {
    // console.log(this.props);
    const {itemList} = this.props;
    // console.log(itemList);

    if (!itemList) {
      // console.log(itemList);
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
