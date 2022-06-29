import Notiflix from 'notiflix';

// const refs = {
//   delayEl: document.querySelector('[name="delay"]');
//   stepEl: document.querySelector('[name="step"]');
//   amountEl: document.querySelector('[name="amount"]');
//   submitEl: document.querySelector('[type="submit"]');
// }

// { delayEl, stepEl, amountEl, submitEl } = refs;

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).


function onFormSubmit(event) {
  event.preventDefault();
  const {
      elements: { delay, step, amount }
    } = event.currentTarget;

  let totalDelay = Number(delay.value);
  
  for (let i = 0; i < amount.value; i += 1) {
    createPromise(i+1, totalDelay)
      .then(value => Notiflix.Notify.success(value))
      .catch(error => Notiflix.Notify.failure(error))
    
    totalDelay += Number(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
    // Fulfill
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
    // Reject
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay)
  }
  )
}