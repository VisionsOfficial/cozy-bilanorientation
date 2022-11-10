export const waitForRepeatingFunctionsToEnd = (function() {
  let timer = 0;
  return function(callback, waitTimeInMs) {
    clearTimeout(timer);
    timer = setTimeout(callback, waitTimeInMs);
  };
})();

export function partial(func /*, 0..n args */) {
  const args = Array.prototype.slice.call(arguments, 1);
  return function() {
    const allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}

// const allProgress = (promises, progress_cb) => {
//   let d = 0;
//   progress_cb(0);
//   for (const p of promises) {
//     p.then(() => {
//       d++;
//       progress_cb((d * 100) / promises.length);
//     });
//   }
//   return Promise.all(promises);
// };

// await allProgress(thisInputKeywordPromises, a => {
//   console.log(`${a.toFixed(2)}% completed`);
// });
