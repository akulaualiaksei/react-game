import React from 'react';

import Button from '../button/button';

const Header = (
  {
    countClicks,
    countDone,
    timeRemaining,
    onClickStartGame,
    buttonLabelStartGame,
    onClickBoardSize,
    buttonLabelBoardSize,
    onClickDifficulties,
    buttonLabelDifficulties,
    onClickBgImage,
    buttonLabelBgImage,
    onClickAutoPlay,
    buttonLabelAutoPlay,

  }) => {

  return (

    <header>
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
      handleClick={onClickStartGame}
      label= {buttonLabelStartGame}
    />
    <Button
      handleClick={onClickBoardSize}
      label= {buttonLabelBoardSize}
    />
    <Button
      handleClick={onClickDifficulties}
      label= {buttonLabelDifficulties}
    />
    <Button
      handleClick={onClickBgImage}
      label= {buttonLabelBgImage}
    />
    <Button
      handleClick={onClickAutoPlay}
      label= {buttonLabelAutoPlay}
    />
    </header>
  )
}

export default Header;