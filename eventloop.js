console.log(1);

const p = new Promise((res, rej) => {
  console.log(1.5)
  res()
})

Promise.resolve().then(() => console.log(2));

setTimeout(() => {
  console.log(3);
  Promise.resolve().then(() => console.log(4));
}, 0);

Promise.resolve().then(() => {
  Promise.resolve().then(() => console.log(5));
  console.log(6);
});

console.log(7);

// 1 1.5 7 2 6 5 3 4