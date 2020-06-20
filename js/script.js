"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

let start = function() {
  do {
    money = prompt("Ваш ежемесячный доход?");
  }
  while (!isNumber(money))
};

let inputSpend = function() {
  let spend;
  do {
    spend = prompt("Во сколько это обойдётся?");
  }
  while (!isNumber(spend));
  return +spend;
};

start();

money = 50000;
income = 10000;
addExpenses = "Интернет, Такси, Коммуналка, Курсы в GloAcademy";
deposit = true;
mission = 100000;
period = 5;

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","Интернет, Такси, Коммуналка, Курсы в GloAcademy");
deposit = confirm("Есть ли у вас депозит в банке?");

let expenses = [];

let getExpensesMonth = function() {
  let sum = 0;

  for (let i = 0; i < 3; i++) {

    expenses[i] = prompt("Введите обязательную статью расходов");

    sum += inputSpend();
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function(revenue, extraRevenue, spending) {
  return (revenue + extraRevenue - spending);
};

let accumulatedMonth = getAccumulatedMonth(money, income, expensesAmount);

let getTargetMonth = function(ambition, accumulat) {
  return (ambition / accumulat);
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
console.log("Расходы за месяц: " + expensesAmount);
console.log("Возможные расходы за месяц: ");
console.log(addExpenses.toLowerCase().split(',')) 
let targetMonth = getTargetMonth(mission, accumulatedMonth);
if (targetMonth < 0) {
  console.log("Цель не будет достигнута");
} else {
  console.log("Срок достижения цели в месяцах: " + Math.ceil(targetMonth));
}

console.log("Бюджет на день: " + Math.floor(budgetDay)); 
getStatusIncome(budgetDay);


