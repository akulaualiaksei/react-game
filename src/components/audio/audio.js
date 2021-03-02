import React, { Component } from 'react';

export default class PlayAudio extends Component {
  state = {
    volume: 1,
    flip: './flip.wav',
    correct: './correct.wav',
    success: './success.wav',
    wrong: './wrong.wav',
  }

  playSound = (src) => {
    return(
      <audio>
        <source src={src}></source>
      </audio>
    )
  }

  render() {
    return(
      this.playSound(this.setState.flip)
    )
  }
}