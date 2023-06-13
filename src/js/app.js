// import * as flsFunctions from './modules/functions.js';

// flsFunctions.isWebp();

function Robot(hp, power) {
  this.hp = hp;
  this.power = power;
  this.attack = function () {
    return Math.floor(Math.random() * this.power + 1);
  };
  this.damage = function (dmg) {
    return (this.hp -= dmg);
  };
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const robot1 = new Robot(getRandom(80, 100), getRandom(10, 15));
const robot2 = new Robot(getRandom(80, 100), getRandom(10, 15));
const hp = document.querySelectorAll(".hp");
const cons = document.querySelector(".console");
const time = document.querySelector(".time");
const winner = document.querySelector(".end");
const start = document.querySelector(".fight");
const avatar = document.querySelector(".avatar");
const avatar2 = document.querySelector(".avatar2");
const restart = document.querySelector(".restart");
let timer;
let timer2;
let count = 3;

console.log(robot1, robot2);

function timeCount() {
  time.innerText = count;
  start.innerHTML = '<img style="width:64px;height:64px" src="img/icon.png">';
  sound(`../files/other/${count}.mp3`);
  if (count == 0) {
    time.classList.add("ftime");
    time.innerText = "FIGHT!";
    start.innerHTML = "FIGHT!";
    sound("../files/other/fight2.mp3");
  } else if (count < 0) {
    clearInterval(timer2);
    time.innerText = "";
    cons.classList.add("console-open");
    avatar.src = "img/scorp-act4.gif";
    avatar2.src = "img/sub-act.gif";
  }
  count--;
}

start.addEventListener(
  "click",
  function () {
    document.documentElement.requestFullscreen
      ? document.documentElement.requestFullscreen()
      : "";
    timer2 = setInterval(timeCount, 1000);
    setTimeout(function () {
      timer = setInterval(fightRobot1, getRandom(500, 2000));
    }, 6000);
    start.style.animation = "none";
  },
  { once: true }
);

let text = [
  "ударил c вертушки",
  "ударил с разворота",
  "опрокинул",
  "ударил из под тишка",
  "пнул в печень",
  "применил суперудар против",
  "снес челюсть",
];

hp[0].innerText = robot1.hp;
hp[1].innerText = robot2.hp;
function fightRobot1() {
  hp[1].innerText = robot2.damage(robot1.attack());
  cons.value += `> Scorpion ${text[getRandom(0, 7)]} Sub-Zero \n`;
  clearInterval(timer);
  timer2 = setInterval(fightRobot2, getRandom(500, 2000));
  if (robot2.hp <= 0) {
    clearInterval(timer);
    clearInterval(timer2);
    hp[1].innerText = 0;
    cons.value += "\n Scorpion победитель!";
    robot2.hp = 0;
    avatar.src = "img/scorp-win.gif";
    avatar2.src = "img/sub-dead.gif";
    winner.innerText = "SCORPION WINS";
    sound("../files/other/scorp.mp3");
    restart.style.display = "flex";
  }
  hp[1].style.backgroundSize = `${robot2.hp}% 100%`;
}
function fightRobot2() {
  hp[0].innerText = robot1.damage(robot2.attack());
  cons.value += `> Sub-Zero ${text[getRandom(0, 7)]} Scorpion \n`;
  clearInterval(timer2);
  timer = setInterval(fightRobot1, getRandom(500, 2000));
  if (robot1.hp <= 0) {
    clearInterval(timer);
    clearInterval(timer2);
    hp[0].innerText = 0;
    robot1.hp = 0;
    cons.value += "\n Sub-Zero победил!";
    avatar2.src = "img/subzero-win.gif";
    avatar.src = "img/scorp-dead.gif";
    avatar2.style = "transform:scale(1.15)";
    winner.innerText = "SUB-ZERO WINS";
    sound("../files/other/subzero.mp3");
    restart.style.display = "flex";
  }
  hp[0].style.backgroundSize = `${robot1.hp}% 100%`;
}

function sound(source) {
  let audio = new Audio();
  audio.src = source;
  audio.autoplay = true;
}

// Кнопки

const hit = document.querySelector(".hit");
const jump = document.querySelector(".jump");
const mask = document.querySelector(".mask");
let timers;
hit.addEventListener("click", function () {
  avatar.src = "img/scorp-act3.gif";
  timers = setTimeout(scorpi, 450);
});
jump.addEventListener("click", function () {
  avatar.src = "img/scorp-mask.gif";
});
mask.addEventListener("click", function () {
  avatar.src = "img/scorp-super2.gif";
  timers = setTimeout(scorpi, 1640);
  sound("../files/other/scor-getover.mp3");
});
function scorpi() {
  clearTimeout(timers);
  avatar.src = "img/scorp.gif";
  avatar.style.bottom = "0px";
}

let move = 100;
let down = false;

document.addEventListener(
  "keydown",
  function (e) {
    if (down) return;
    down = true;
    switch (e.keyCode) {
      case 37:
        avatar.src = "img/scorp-walk.gif";
        timers = setTimeout(scorpi, 300);
        move -= 100;
        avatar.style.left = `${move}px`;
        break;
      case 38:
        avatar.src = "img/scorp-jump3.gif";
        timers = setTimeout(scorpi, 300);
        avatar.style.bottom = "200px";
        avatar.style.zIndex = "1";
        break;
      case 39:
        avatar.src = "img/scorp-walk.gif";
        timers = setTimeout(scorpi, 300);
        move += 100;
        avatar.style.left = `${move}px`;
        console.log(move);
        break;
      case 40:
        avatar.src = "img/scorp-jump.gif";
        timers = setTimeout(scorpi, 600);
        avatar.style.zIndex = "-1";
        break;
    }
  },
  false
);
document.addEventListener(
  "keyup",
  function () {
    down = false;
  },
  false
);

const changeBg = document.querySelector(".change-bg");
changeBg.addEventListener("click", function () {
  document.querySelector("body").classList.toggle("arena2");
});
// preloader

window.onload = function () {
  document.body.classList.add("loaded_hiding");
  window.setTimeout(function () {
    document.body.classList.add("loaded");
    document.body.classList.remove("loaded_hiding");
  }, 500);
};

let isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0;
