"use strict";

function getRandomInt(min,max) {
  return Math.floor(min + Math.random() * Math.floor(max));
}

//Задание 1
console.log("Задание 1");
let arr=[];

for (let i = 0; i < 7; i++) {
  arr.push(""+getRandomInt(10,99999));
}
console.log(arr);

for (let i in arr) {
  if (arr[i][0] === "2" || arr[i][0] === "4") {
    console.log(arr[i]);
  }
}

//Задание 2
console.log("Задание 2");

let isSimple = function(number) {
  let simple = true;
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      simple = false;
      break;
    }
  }
  return simple;
}

for (let n = 1; n <= 100; n++) {
  if (isSimple(n)) {
    if (n != 1) {
      console.log(`Число ${n} имеет делители 1 и ${n}`);
    } else {
      console.log(`Число ${n} имеет делитель 1`);
    }
  }
}



