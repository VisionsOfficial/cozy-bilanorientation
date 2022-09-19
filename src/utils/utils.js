export const waitForRepeatingFunctionsToEnd = (function() {
  let timer = 0;
  return function(callback, waitTimeInMs) {
    clearTimeout(timer);
    timer = setTimeout(callback, waitTimeInMs);
  };
})();
