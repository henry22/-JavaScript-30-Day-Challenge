const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleBtn = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let mousePress = false;


function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateToggleBtn() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggleBtn.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function slider() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleBtn);
video.addEventListener('pause', updateToggleBtn);
video.addEventListener('timeupdate', handleProgress);

toggleBtn.addEventListener('click', togglePlay);

skipBtns.forEach(skipBtn => skipBtn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', slider));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousePress && scrub(e));
progress.addEventListener('mousedown', () => mousePress = true);
progress.addEventListener('mouseup', () => mousePress = false);
