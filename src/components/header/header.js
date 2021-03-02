import React from 'react';

const Header = ({countClicks, countDone, timeRemaining}) => {

  return (

    <React.Fragment>
    <span>
      {`click counts: ${countClicks}`}
    </span>
    <span>
      {`done counts: ${countDone}`}
    </span>
    <span>
      {`time remain: ${timeRemaining}`}
    </span>
    </React.Fragment>
  )
}

export default Header;