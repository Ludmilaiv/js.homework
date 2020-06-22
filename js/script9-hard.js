"use strict";

const week = [
  "Воскресенье", "Понедельник",
  "Вторник", "Среда", "Четверг",
  "Пятница", "Суббота"
];

const monthes = [
  "января", "февраля",
  "марта", "апреля",
  "мая", "июня",
  "июля", "августа",
  "сентября", "октября",
  "ноября", "декабря" 
]

let elem = document.querySelectorAll("p");

let getDecline = function(time){
  let result = [];
  let decs = [[0,5,6,7,8,9],[1],[2,3,4]];
  let decWords = [
    ["часов","минут","секунд"],
    ["час","минута","секунда"],
    ["часа","минуты","секунды"]
  ];
  for (let keyTime in time){
    if (Math.floor(time[keyTime]/10) == 1) {
      result.push(decWords[0][keyTime]);
      continue;
    } else {
        for (let keyDec in decs) {
        if (decs[keyDec].includes(time[keyTime]%10)) {
          result.push(decWords[keyDec][keyTime]);
          break;
        }
      }
    }
    
  }
  return result;    
}

let getZero = function(number) {
  let result = "" + number;
  if (result.length == 1) {
    result = "0" + result;
  }
  return result;
}

let showDate = function() {
  const dateNow = new Date();
  let day = dateNow.getDay();
  let date = dateNow.getDate();
  let month = dateNow.getMonth();
  let year = dateNow.getFullYear();
  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes();
  let seconds = dateNow.getSeconds();
  let decline = getDecline([hours,minutes,seconds])
  elem[0].innerHTML = `Сегодня ${week[day]}, ${date} 
                      ${monthes[month]} ${year} года, 
                      ${hours} ${decline[0]} 
                      ${minutes} ${decline[1]} 
                      ${seconds} ${decline[2]}`;

  elem[1].innerHTML = `${getZero(date)}.${getZero(month)}.${getZero(year)} - 
                    ${getZero(hours)}:${getZero(minutes)}:${getZero(seconds)}`  
}
showDate();
setInterval(showDate, 1000);


