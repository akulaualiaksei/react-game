import React from 'react';

const Header = (props) => {
  console.log(props);
  return (
    <span>
      {props.countTry}
    </span>
  )
}

export default Header;