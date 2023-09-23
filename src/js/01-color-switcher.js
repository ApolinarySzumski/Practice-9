function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;

const handleStart = () => {
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
  intervalId = setInterval(
    () => (body.style.backgroundColor = getRandomHexColor()),
    1000
  );
};

const handleStop = () => {
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
  clearInterval(intervalId);
};

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);
