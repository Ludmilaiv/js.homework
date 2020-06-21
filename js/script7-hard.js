"use strict";

let week = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
] 

let now = new Date();
let day = now.getDay() - 1;
if (day === -1) {
  day = 6; 
}
for (let key in week) {
  let strHTML = '';
  strHTML += '<p style="';
  if (key == 5 || key == 6) {
    strHTML +='font-style:italic;';
  }
  if (key == day) {
    strHTML +='font-weight:bold;';
  }
  strHTML += `">${week[key]}</p>`;
  document.body.innerHTML += strHTML;
}
