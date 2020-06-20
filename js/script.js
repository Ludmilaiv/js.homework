"use strict";

//Lesson 01
let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

//Lesson02
money = 50000;
income = 10000;
addExpenses = "Интернет, Такси, Коммуналка, Курсы в GloAcademy";
deposit = true;
mission = 100000;
period = 5;

//Lesson03
money = parseFloat(prompt("Ваш ежемесячный доход?","50000"));
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","Интернет, Такси, Коммуналка, Курсы в GloAcademy");
deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов","еда");
let amount1 = parseFloat(prompt("Во сколько это обойдется?","5000"));
let expenses2 = prompt("Введите обязательную статью расходов","одежда");
let amount2 = parseFloat(prompt("Во сколько это обойдется?","5000"));

//Lesson04

let getExpensesMonth = function(spending1, spending2) {
  return (spending1 + spending2);
}

let getAccumulatedMonth = function(revenue, extraRevenue, spending) {
  return (revenue + extraRevenue - spending);
}

let accumulatedMonth = getAccumulatedMonth(money, income, getExpensesMonth(amount1,amount2));

let getTargetMonth = function(ambition, accumulat) {
  return (Math.ceil(ambition / accumulat));
}

let showTypeOf = function(val, name) {
  console.log(`Переменная ${name} имеет тип ${typeof(val)}`);
}

let getStatusIncome = function(budgDay) {
  if (budgDay > 1200) 
  console.log("У вас высокий уровень дохода");
else 
  if (budgDay > 600) 
    console.log("У вас средний уровень дохода");
  else
    if (budgDay > 0)
      console.log("К сожалению у вас уровень дохода ниже среднего");
    else
      console.log("Что то пошло не так");
}

let budgetDay = accumulatedMonth / 30

showTypeOf(money,"money");
showTypeOf(income,"income");
showTypeOf(deposit,"deposit");
console.log("Расходы за месяц: " + getExpensesMonth(amount1,amount2));
console.log("Возможные расходы за месяц: ");
console.log(addExpenses.toLowerCase().split(','));
console.log("Срок достижения цели в месяцах: " + getTargetMonth(mission, accumulatedMonth));
console.log("Бюджет на день: " + Math.floor(budgetDay)); 
getStatusIncome(budgetDay);

