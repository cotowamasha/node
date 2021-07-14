const EventEmitter = require('events');

const user_date = process.argv[2];
// минуты-час-день-месяц-год
// 30-15-14-07-2021

let arr = user_date.split('-');

let end_date = {
  "full_year": arr[4],
  "month": arr[3],
  "day": arr[2],
  "hours": arr[1],
  "minutes": arr[0],
  "seconds": "00"
}

let end_date_str = `${end_date.full_year}-${end_date.month}-${end_date.day}T${end_date.hours}:${end_date.minutes}:${end_date.seconds}`;

function diffSubtract(date1, date2) {
  return date2 - date1;
}

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(resolve, ms);
  });
};

const countingSeconds = () => {
  return delay(1000).then(() => {
    let now = new Date();
    let date = new Date(end_date_str);
    let ms_left = diffSubtract(now, date);
    if (ms_left <= 0) {
      console.log("Время закончилось");
    } else {
      let res = new Date(ms_left);
      let str_timer = `${res.getUTCFullYear() - 1970}.${res.getUTCMonth()}.${res.getUTCDate() - 1} ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}`;      
      console.log(str_timer);
    }
  });
}

const run = async () => {
  await countingSeconds()
  run();
};
run();