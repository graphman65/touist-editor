export default function debounce(fn, delay) {
  let timeoutID = null;
  return function debounced(...args) {
    clearTimeout(timeoutID);
    const self = this;
    timeoutID = setTimeout(() => fn.apply(self, args), delay);
  };
}
