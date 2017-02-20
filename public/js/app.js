var Timer = {
  minutesLeft:25,
  secondsLeft: 0,
  isOnBreak: false,
  numberOfBreaks: 0,
  session: 1,
  breakNumber: 0,
  bell: new Audio('/js/kirby.mp3'),
  init: function(){
    this.cacheDom();
    this.addListeners();
    this.render();
  },
  cacheDom: function(){
    this.minutes = document.querySelector('#minutes');
    this.seconds = document.querySelector('#seconds');
    this.startButton = document.querySelector('#start');
    this.stopButton = document.querySelector('#stop');
    this.resetButton = document.querySelector('#reset');
    this.break = document.querySelector('.breakCounter');
    this.work = document.querySelector('.workCounter');
  },
  render: function(){
    this.minutes.textContent = this.pad(this.minutesLeft);
    this.seconds.textContent = this.pad(this.secondsLeft);
    this.break.textContent = `Number of breaks: ${this.breakNumber}`;
    this.work.textContent = `Work session: ${this.session}`;
    console.log(this.numberOfBreaks);
  },
  addListeners: function(){
    // The bind statement takes the meaning of 'this' from addlisteners and pushes this meaning
    // into the start function.
    this.startButton.addEventListener('click', this.start.bind(this));
    this.stopButton.addEventListener('click', this.stop.bind(this));
    this.resetButton.addEventListener('click', this.reset.bind(this));
  },
  start: function(){
    if(!this.timer){
    this.timer = setInterval(this.tick.bind(this), 1000);
  }},
  stop: function(){
      this.timer = clearInterval(this.timer);
  },
  reset: function(){
    if(this.secondsLeft !== 0 || this.minutesLeft !== 0){
      this.minutesLeft = 25,
      this.secondsLeft = 0,
      this.session = 1,
      this.numberOfBreaks = 0,
      this.breakNumber = 0,
      this.render();
      this.stop();
      }
  },
  tick: function(){
    if(this.secondsLeft === 0 && this.minutesLeft ===  0){
      clearInterval(this.timer);
      this.timer = !this.timer; //dereference
      if(this.isOnBreak){
        this.sessions +=1;
        this.resetWorkTime();
        this.render();
      } else {
        this.resetBreakTime();
      }
      this.isOnBreak = !this.isOnBreak;
      this.render();
      return;
    }
    this.decrementMinutes();
    this.decrementSeconds();
    this.render();
  },
  decrementMinutes: function(){
    if(this.secondsLeft === 0){
      this.minutesLeft -= 1;
    }
  },
  decrementSeconds: function(){
    if(this.secondsLeft === 0){
      this.secondsLeft = 59;
    } else {
      this.secondsLeft -= 1;
    }
  },
  pad: function(num){
    if(num < 10){
      return `0${num}`;
    } else {
      return num;
    }
  },
  resetWorkTime: function(){
    this.minutesLeft = 25;
    this.secondsLeft = 0;
    this.session += 1;
    this.bell.play();
  },
  resetBreakTime: function(){
      if(this.numberOfBreaks < 3){
        this.minutesLeft = 5;
        this.breakNumber += 1;
        this.numberOfBreaks += 1;
        this.bell.play();
      } else {
        this.minutesLeft = 15;
        this.numberOfBreaks = 0;
        this.breakNumber += 1;
        this.bell.play();
      }
      this.secondsLeft = 0;
    }

};
Timer.init();
