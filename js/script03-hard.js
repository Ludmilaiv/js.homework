"use strict";

//Задание 1

alert("Задание 1");
let lang;
if (confirm("Вы говорите по русски?"))
  lang = "ru";
else
  if (confirm("Do you speak english?"))
    lang = "en";

let daysRu = ["Понедельник","Вторник","Среда","Четверг","Пятница", "Суббота","Воскресенье"];
let daysEn = ["Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday","Sunday"];

//Способ а - через if
alert("Способ а - через if");
if (lang === "ru")
  alert(daysRu.join(', '));
else
  if (lang === "en")
    alert(daysEn.join(', '));
  else alert(":(");

//Способ b - через switch-case 
alert("Способ b - через switch-case");
switch(lang) {
  case "ru":
    alert(daysRu.join(', '));
    break;
  case "en":
    alert(daysEn.join(', '));
    break;
  default:
    alert(":(");
    break;
}

//Способ c - через многомерный массив (объект) без ифов и switch
alert("Способ c - через многомерный массив (объект) без ифов и switch");
let daysMultilang = {"ru":daysRu, "en":daysEn, "undefined":[":("] };
alert(daysMultilang[lang].join(', '));

//Задание 2

alert("Задание 2");
let namePerson = prompt("Введите имя");
let message = (namePerson == "Артем") ? "директор" :
  (namePerson == "Максим") ? "преподаватель":
  (namePerson) ? "студент":
  "Да кто ты такой???";
console.log(message);
alert("Загляни в консоль и узнай кто ты...");
