import React from 'react';

import Button from '../button/button';

const Header = (
  {
    countClicks,
    countDone,
    timeRemaining,
    onClick,
    buttonLabel,
  }) => {

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
    <Button
      handleClick={onClick}
      label= {buttonLabel}
    />
    {/* <Button
      handleClick={onClick}
      label= {buttonLabel}
    /> */}
    </React.Fragment>
  )
}

export default Header;