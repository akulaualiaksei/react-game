const getToFixed = (num) => +num.toFixed(2);

export default class PlayAudio {
  constructor(isAudioOn, audioVolume) {
      this.bgAudio = new Audio('./bg.mp3');
      this.correctAudio = new Audio('./correct.wav');
      this.winGame = new Audio('./success.wav');
      this.wrongAudio = new Audio('./wrong.mp3');
      this.flipAudio = new Audio('./flip.wav');
      this.loseGame = new Audio('./lose.wav');
      this.isOn = isAudioOn;
      this.volume = audioVolume;
  }

  startBg() {
    if (this.isOn) {
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.volume / 2;

      this.bgAudio.load();
      this.bgAudio.play();
    }
  }

  stopBg() {
      this.bgAudio.pause();
      this.bgAudio.currentTime = 0;
  }

  audioUp() {
    if (this.volume < 1) {
      this.volume = getToFixed(this.volume + 0.1);
      this.bgAudio.volume = getToFixed(this.volume * 0.5);
    }
  }

  audioDown() {
    if (this.volume > 0) {
      this.volume = getToFixed(this.volume - 0.1);
      this.bgAudio.volume = getToFixed(this.volume * 0.5);
    }
  }

  toggleAudio() {
    this.isOn = !this.isOn;
    if (this.isOn) {
      this.startBg();
    } else {
      this.stopBg();
    }
  }

  correct() {
    if (this.isOn) {
      this.correctAudio.play();
    }
  }

  win() {
    if (this.isOn) {
      this.winGame.play();
    }
  }

  wrong() {
    if (this.isOn) {
      this.wrongAudio.play();
    }

  }

  flip() {
    if (this.isOn) {
      this.flipAudio.play();
    }
  }

  lose() {
    if (this.isOn) {
      this.loseGame.play();
    }
  }

}