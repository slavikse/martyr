import range from 'libs/range';
import throttle from 'libs/throttle';
import noise from './../helper/noise';

const
  $body = document.body,
  $catPosition = $body.querySelector('.cat-position'),
  $cat = $catPosition.querySelector('.cat'),
  $toBad = $body.querySelector('.to-bad'),
  eventEnemyCreate = new Event('enemyCreate'),
  audioURI = window.audioURI,
  audioToBad = window.audioSprite.to_bad,
  playingFieldResize = throttle(playingField, 500),
  moveTime = 5000;

let
  runTimerID,
  moveTimerID,
  hideTimerID,
  playingFieldWidth,
  playingFieldHeight;

playingField();

function run() {
  moveTimerID = setTimeout(move, moveTime);
  setTimeout(show, moveTime + 100);
  hideTimerID = setTimeout(hide, moveTime * 3 + 100);
}

function move() {
  const
    x = range(0, playingFieldWidth),
    y = range(0, playingFieldHeight);

  $catPosition.style.transform = `translate(${x}px, ${y}px)`;
  moveTimerID = setTimeout(move, moveTime);
}

function show() {
  $catPosition.classList.add('cat-show');
}

function hide() {
  stop();
  runTimerID = setTimeout(run, moveTime * 2);
}

function stop() {
  $catPosition.classList.remove('cat-show');

  clearTimeout(runTimerID);
  clearTimeout(moveTimerID);
  clearTimeout(hideTimerID);
}

function shoot() {
  if (!$catPosition.classList.contains('cat-show')) {
    return;
  }

  hide();
  toBad();

  document.dispatchEvent(eventEnemyCreate);
}

function toBad() {
  noise(audioURI, audioToBad);

  $body.classList.add('dont-shoot');
  $toBad.style.animationName = 'to-bad';
  $cat.style.animationName = 'cat-flip';

  setTimeout(toBadHide, 1400); // анимация
}

function toBadHide() {
  $body.classList.remove('dont-shoot');
  $toBad.style.animationName = '';
  $cat.style.animationName = '';
}

function playingField() {
  const
    catWidth = 94,
    catHeight = 148,
    panelHeight = 100;

  playingFieldWidth = window.innerWidth - catWidth;
  playingFieldHeight = window.innerHeight - catHeight - panelHeight;
}

function gameOver() {
  $cat.remove();
}

document.addEventListener('startGame', run);
document.addEventListener('catShoot', shoot);
document.addEventListener('waveEnd', stop);
document.addEventListener('waveStart', run);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', gameOver);

