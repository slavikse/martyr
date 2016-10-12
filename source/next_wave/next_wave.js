const
  $nextTime = document.querySelector('.next-time'),
  nextTimeMax = 4,
  numberWaveMax = 1,
  eventEnemyCreate = new Event('enemyCreate'),
  eventWaveEnd = new Event('waveEnd');

let
  isWaveEnd,
  nextTimeTimeout,
  nextTimeCurrent = nextTimeMax,
  numberWaveCurrent = 0;

function startWave() {
  $nextTime.style.animationName = 'blink';
  isWaveEnd = false;

  nextTime();
}

function nextTime() {
  nextTimeTimeout = setTimeout(timer, 1000);
}

function timer() {
  $nextTime.textContent = nextTimeCurrent;
  nextTimeCurrent -= 1;

  if (nextTimeCurrent === -1) {
    nextTimeCurrent = nextTimeMax;
    nextWave();
  }

  if (!isWaveEnd) {
    nextTime();
  }
}

function nextWave() {
  numberWaveCurrent += 1;
  document.dispatchEvent(eventEnemyCreate);

  waveEnd();
}

function waveEnd() {
  if (numberWaveCurrent === numberWaveMax) {
    numberWaveCurrent = 0;
    isWaveEnd = true;

    $nextTime.style.animationName = '';
  }
}

function noEnemy() {
  if (isWaveEnd) {
    document.dispatchEvent(eventWaveEnd);
  }
}

function gameOver() {
  clearTimeout(nextTimeTimeout);
}

document.addEventListener('startGame', startWave);
document.addEventListener('noEnemy', noEnemy);
document.addEventListener('closeShop', startWave);
document.addEventListener('gameOver', gameOver);
