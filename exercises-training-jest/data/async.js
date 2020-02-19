var scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;

function flushPromises() {
  return new Promise(function(resolve) {
    scheduler(resolve);
  });
}

const delay = (time) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, time)
})

module.exports = {
  flushPromises,
  delay,
}
