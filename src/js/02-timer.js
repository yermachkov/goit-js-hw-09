import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
}

let selectedDate = null;
let isActive = false;

refs.startBtn.setAttribute('disabled', 'disabled');

const calendarOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (Date.now() >= selectedDate) {
      refs.startBtn.setAttribute('disabled', 'disabled');
      Notify.failure('Please choose a date in the future', notifyOptions);
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

const calendar = flatpickr('input#datetime-picker', calendarOptions);


const notifyOptions = {
  width: '380px',
  timeout: 4000,
  clickToClose: true,
}

refs.startBtn.addEventListener('click', onStartClick);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartClick() {
  if (isActive) {
    return;
  }
  
  isActive = true;

  const timerId = setInterval (() => {
    const timeDif = selectedDate - Date.now();
    const timerData = convertMs(timeDif);
    refs.daysEl.innerHTML = timerData.days;
    refs.hoursEl.innerHTML = timerData.hours;
    refs.minutesEl.innerHTML = timerData.minutes;
    refs.secondsEl.innerHTML = timerData.seconds;

    if (timerData.seconds <= 0) {
      clearInterval(timerId);
      isActive = false;
    }
  }, 1000);
}

