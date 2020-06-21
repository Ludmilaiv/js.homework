"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function() {
  do {
    money = prompt("Ваш ежемесячный доход?");
  }
  while (!isNumber(money))
};

start();

let appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 3,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    for (let i = 0; i < 3; i++) {
      let key = prompt("Введите обязательную статью расходов");
      let spend;
      do {
        spend = prompt("Во сколько это обойдётся?");
      }
      while (!isNumber(spend));
      appData.expenses[key] = +spend;
    }
    console.log("Обязательные статьи расходов")
    console.log(appData.expenses);
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
  getExpensesMonth: function() {
    let sum = 0;
    for(let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function() {
    return (appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function() {
    let targetMonth = appData.getTargetMonth();
    if (targetMonth < 0) {
      console.log("Цель не будет достигнута");
    } else {
      console.log("Срок достижения цели в месяцах: " + Math.ceil(targetMonth));
    };
    console.log("Бюджет на день: " + Math.floor(appData.budgetDay)); 
    if (appData.budgetDay > 1200) {
      console.log("У вас высокий уровень дохода");
    } else {
      if (appData.budgetDay > 600) {
        console.log("У вас средний уровень дохода");
      } else {
        if (appData.budgetDay > 0) {
          console.log("К сожалению у вас уровень дохода ниже среднего");
        } else {
          console.log("Что то пошло не так");
        }
      } 
    }
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log("Расходы за месяц: " + appData.expensesMonth);
console.log("Возможные расходы за месяц: ");
console.log(appData.addExpenses);
appData.getStatusIncome();
console.log("Наша программа включает в себя данные:");
for (let key in appData) {
  console.log(`Ключ: ${key} :`);
  console.log(appData[key]);
}

