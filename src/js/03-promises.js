import Notiflix from 'notiflix';
import _ from 'lodash';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      );
    } else {
      reject(
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    }
  });
  return promise;
}

const handleSubmit = e => {
  const { delay, step, amount } = e.currentTarget.elements;

  e.preventDefault();

  let intervalId = null;

  // //declarative variant
  // const delayValue = Number(delay.value);
  // const stepValue = Number(step.value);
  // const amountValue = Number(amount.value);

  // const array = _.range(1, amountValue + 1);
  // console.log(array);

  // array.forEach();

  // imperative variat
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  let counter = 1;
  let delayPlusStep = delayValue;

  setTimeout(() => {
    intervalId = setInterval(() => {
      createPromise(counter, delayPlusStep).then(
        onResolve => {
          onResolve;
        },
        onReject => {
          onReject;
        }
      );
      counter++;
      delayPlusStep += stepValue;
      if (counter > amountValue) {
        clearInterval(intervalId);
      }
    }, stepValue);
  }, delayValue);
};

form.addEventListener('submit', handleSubmit);
