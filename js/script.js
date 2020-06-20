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
