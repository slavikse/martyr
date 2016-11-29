import '../grenade_notice/grenade_notice';

const $grenade = document.querySelector('.grenade');
const $grenadeCount = $grenade.querySelector('.grenade-count');
const eventGrenade = new Event('grenade');

let grenadeCount = 1;
let grenadeCountTotalStat = 0;

changeCount();

function changeCount(change = 0) {
  grenadeCount += change;
  $grenadeCount.textContent = `x${grenadeCount}`;
}

function grenade() {

  /** GOD MOD */

  if (window.god) {
    grenadeCount = 10;
  }

  /** / GOD MOD */

  if (grenadeCount > 0) {
    changeCount(-1);
    grenadeCountTotalStat += 1;
    document.dispatchEvent(eventGrenade);
  }
}

function buyGrenade() {
  changeCount(1);
}

function showGrenade() {
  $grenade.style.opacity = 1;
}

function startGame() {
  setTimeout(showGrenade, 2000);
  addListenKey();
}

function gKeyHandler(e) {
  if (e.keyCode === 71) {
    grenade();
  }
}

function addListenKey() {
  document.addEventListener('keyup', gKeyHandler);
}

function removeListenKey() {
  document.removeEventListener('keyup', gKeyHandler);
}

function grenadeStatistic() {
  const grenadeCountEvent = new Event('grenadeCount');
  grenadeCountEvent.grenadeCountTotal = grenadeCountTotalStat;
  document.dispatchEvent(grenadeCountEvent);
}

function gameOver() {
  removeListenKey();
  grenadeStatistic();
}

document.addEventListener('startGame', startGame);
document.addEventListener('waveStart', addListenKey);
document.addEventListener('buyGrenade', buyGrenade);
document.addEventListener('waveEnd', removeListenKey);
document.addEventListener('gameOver', gameOver);