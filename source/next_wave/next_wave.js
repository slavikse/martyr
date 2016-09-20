const
  $nextWaveTime = document.querySelector('.next-wave-time'),
  $event = document.querySelector('.event'),
  nextTimeFull = 5;

let nextTimeCurrent = nextTimeFull;

function nextWave() {
  setInterval(nextWaveTime, 1000);
}

function nextWaveTime() {
  requestAnimationFrame(() => {
    nextTimeCurrent -= 1;
    $nextWaveTime.textContent = nextTimeCurrent;
  });

  if (nextTimeCurrent < 1) {
    nextTimeCurrent = nextTimeFull;
  }
}

$event.addEventListener('nextWaveTimer', nextWave);
