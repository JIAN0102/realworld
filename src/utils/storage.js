export default (key) => ({
  get() {
    return JSON.parse(window.localStorage.getItem(key));
  },
  set(value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove() {
    window.localStorage.removeItem(key);
  },
});
