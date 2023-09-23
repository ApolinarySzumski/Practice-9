import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const datetimePicker = document.querySelector('input[type = "text"]');
const btn = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let selectedDateTimestamp = selectedDates[0].getTime();
    let diffrenceTimestamp = selectedDateTimestamp - actualTimestamp;

    if (selectedDateTimestamp < actualTimestamp) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btn.setAttribute('disabled', '');
    } else {
      btn.removeAttribute('disabled');
      daysField.innerText = addLeadingZero(convertMs(diffrenceTimestamp).days);
      hoursField.innerText = addLeadingZero(
        convertMs(diffrenceTimestamp).hours
      );
      minutesField.innerText = addLeadingZero(
        convertMs(diffrenceTimestamp).minutes
      );
      secondsField.innerText = addLeadingZero(
        convertMs(diffrenceTimestamp).seconds
      );
    }
  },
};

let actualTimestamp = options.defaultDate.getTime();
const input = flatpickr(datetimePicker, options);
btn.setAttribute('disabled', '');

const startCountdown = () => {
  let intervalId = null;
  let inputTimestamp = input.selectedDates[0].getTime();
  let diffrenceTimestamp = inputTimestamp - actualTimestamp;
  intervalId = setInterval(() => {
    diffrenceTimestamp -= 1000;
    daysField.innerText = addLeadingZero(convertMs(diffrenceTimestamp).days);
    hoursField.innerText = addLeadingZero(convertMs(diffrenceTimestamp).hours);
    minutesField.innerText = addLeadingZero(
      convertMs(diffrenceTimestamp).minutes
    );
    secondsField.innerText = addLeadingZero(
      convertMs(diffrenceTimestamp).seconds
    );
    if (diffrenceTimestamp < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
};

btn.addEventListener('click', startCountdown);
