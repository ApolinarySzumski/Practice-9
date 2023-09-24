import Notiflix from 'notiflix';
import _ from 'lodash';

const form = document.querySelector('.form');

// // imperative variat
// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   const promise = new Promise((resolve, reject) => {
//     if (shouldResolve) {
//       resolve(
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         )
//       );
//     } else {
//       reject(
//         Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
//       );
//     }
//   });
//   return promise;
// }

// const handleSubmit = e => {
//   const { delay, step, amount } = e.currentTarget.elements;

//   e.preventDefault();

//   let intervalId = null;

//   const delayValue = Number(delay.value);
//   const stepValue = Number(step.value);
//   const amountValue = Number(amount.value);

//   let counter = 1;
//   let delayPlusStep = delayValue;

//   setTimeout(() => {
//     intervalId = setInterval(() => {
//       createPromise(counter, delayPlusStep).then(
//         onResolve => {
//           onResolve;
//         },
//         onReject => {
//           onReject;
//         }
//       );
//       counter++;
//       delayPlusStep += stepValue;
//       if (counter > amountValue) {
//         clearInterval(intervalId);
//       }
//     }, stepValue);
//   }, delayValue);

//   form.reset();
// };

// //declarative variant
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

const handleSubmit = e => {
  const { delay, step, amount } = e.currentTarget.elements;

  e.preventDefault();

  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  const amountRange = _.range(1, amountValue + 1);

  amountRange.forEach(i => {
    const position = i;
    const currentDelay = delayValue + stepValue * (i - 1);
    createPromise(position, currentDelay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }, stepValue);
};

form.addEventListener('submit', handleSubmit);
