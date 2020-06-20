"use strict";

//Lesson 01
let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;
alert("Hello! My name is Mila! I can show message!");
console.log("Also I can use the consol. It's very simple lesson");

//Lesson02
money = 50000;
income = 10000;
addExpenses = "Интернет, Такси, Коммуналка, Курсы в GloAcademy";
deposit = true;
mission = 100000;
period = 5;
console.log("Переменная money имеет тип " + typeof(money));
console.log("Переменная income имеет тип " + typeof(income));
console.log("Переменная deposit имеет тип " + typeof(deposit));
console.log("Длина строки addExpenses равна " + addExpenses.length);
console.log(`Период равен ${period} месяцев.\nЦель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split());
let  budgetDay = (money + income) / 30;
console.log(`Дневной бюджет равен ${budgetDay} рублей`);

//Lesson03
money = parseFloat(prompt("Ваш ежемесячный доход?"),"50000");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","Интернет, Такси, Коммуналка, Курсы в GloAcademy");
deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов","еда");
let amount1 = parseFloat(prompt("Во сколько это обойдется?","5000"));
let expenses2 = prompt("Введите обязательную статью расходов","одежда");
let amount2 = parseFloat(prompt("Во сколько это обойдется?","5000"));
let budgetMonth = money - (amount1 + amount2);
console.log("Количество месяцев для достижения цели: " + Math.ceil(mission / budgetMonth));
budgetDay = (budgetMonth + income) / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));
if (budgetDay > 1200) 
  console.log("У вас высокий уровень дохода");
else 
  if (budgetDay > 600) 
    console.log("У вас средний уровень дохода");
  else
    if (budgetDay > 0)
      console.log("К сожалению у вас уровень дохода ниже среднего");
    else
      console.log("Что то пошло не так");
