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
    onClickAudioToggle,
    buttonLabelAudioToggle,
    onClickSoundUp,
    buttonLabelSoundUp,
    onClickSoundDown,
    buttonLabelSoundDown,

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
    <Button
      handleClick={onClickAudioToggle}
      label= {buttonLabelAudioToggle}
    />
    <Button
      handleClick={onClickSoundUp}
      label= {buttonLabelSoundUp}
    />
    <Button
      handleClick={onClickSoundDown}
      label= {buttonLabelSoundDown}
    />
    </header>
  )
}

export default Header;