const colors = require("colors/safe");

const from = process.argv[2];
const to = process.argv[3];

function simpleNumbers() {
  if (+from === NaN || +from === NaN) {
    console.log(colors.red("Введите 2 числа через пробел"));
    return;
  }

  let counter = 0;
  colorsList = ["green", "yellow", "red"];
  let find = 0;

  nextPrime:
  for (let i = +from; i <= +to; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    
    console.log(colors[colorsList[counter]](i));
    counter == 2 ? counter = 0 : ++counter;
    ++find;
  }
  if (!find) console.log(colors.red("Простых чисел не нашлось в вашем диапазоне"))
}

simpleNumbers();