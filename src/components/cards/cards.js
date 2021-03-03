const cardsData = [
  {
    id: 1,
    name: '1',
    image: '1.png',
    flipped: false,
    done: false,
    checked: false,
    key: null,
  },
  {
    id: 2,
    name: '2',
    image: '2.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
  {
    id: 3,
    name: '3',
    image: '3.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
  {
    id: 4,
    name: '4',
    image: '4.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
  {
    id: 5,
    name: '5',
    image: '5.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
  {
    id: 6,
    name: '6',
    image: '6.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
  {
    id: 7,
    name: '7',
    image: '7.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
  {
    id: 8,
    name: '8',
    image: '8.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
  {
    id: 9,
    name: '9',
    image: '9.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
  {
    id: 10,
    name: '10',
    image: '10.png',
    flipped: false,
    checked: false,
    done: false,
    key: null,
  },
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.map((obj, index) => ({...obj, key: index}));
}

// const createCardItem = (number) => {
const createCardItem = () => {

  // const firstArray = cardsData.slice(number);

    // let randomArray = [...firstArray, ...firstArray];
    let randomArray = [...cardsData, ...cardsData];

    return shuffle(randomArray);
}

export default createCardItem;
