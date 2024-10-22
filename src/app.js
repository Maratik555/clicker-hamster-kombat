const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const btn = document.querySelector('#btn');
const nextLevel = document.querySelector('#nextLevel');

let reset = () => {
  if(confirm('Are you sure?')) setScore(0);
  $circle.src = './assets/frog.png';
  nextLevel.textContent = '✅ next level 50 coins';
};

btn.addEventListener('click', reset);

function start() {
  setScore(getScore());
  setImage();
}

function setScore(score) {
  localStorage.setItem('score', score);
  $score.textContent = score;
}

function getScore() {
  return +localStorage.getItem('score') ?? 0;
}

function addOne() {
  setScore(getScore() + 1);
  setImage()
}

function showAlert() {
  const alertBox = document.querySelector('#alert');
  alertBox.style.display = 'block'; // Показать уведомление

  setTimeout(() => {
    alertBox.style.display = 'none'; // Скрыть уведомление
  }, 1000);
}

function setImage() {
  if(getScore() === 50) {
    showAlert();
  }
  if(getScore() >= 50) {
    $circle.src = './assets/lizzard.png';
    nextLevel.textContent = '✅';
  }
}

$circle.addEventListener('click', e => {
  const rect = $circle.getBoundingClientRect();
  const offsetX = e.clientX - rect.left - rect.width /2;
  const offsetY = e.clientY - rect.top - rect.height /2;
  const DEG = 50;

  const tiltX = (offsetY / rect.height) * DEG;
  const tiltY = (offsetX / rect.width) * -DEG;

  $circle.style.setProperty('--tiltX', `${tiltX}deg`);
  $circle.style.setProperty('--tiltY', `${tiltY}deg`);

  setTimeout(() => {
    $circle.style.setProperty('--tiltX', `0deg`);
    $circle.style.setProperty('--tiltY', `0deg`);
  }, 300);

  const plusOne = document.createElement('div');
  plusOne.classList.add('plus-one');
  plusOne.textContent = '+1';
  plusOne.style.left = `${e.clientX - rect.left}px`;
  plusOne.style.top = `${e.clientY - rect.top}px`;

  $circle.parentElement.appendChild(plusOne);

  addOne();

  setTimeout(() => {
    plusOne.remove();
  }, 2000);

});

start();