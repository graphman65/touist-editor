export default function debounce(fn, delay) {
  let timeoutID = null;
  return function debounced(force, ...args) {
    if (force) {
      fn.apply(this, args);
      return;
    }
    clearTimeout(timeoutID);
    const self = this;
    timeoutID = setTimeout(() => fn.apply(self, args), delay);
  };
}
