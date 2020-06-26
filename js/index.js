"use strict";

const startBtn = document.getElementById("start");
const cancelBtn = document.getElementById("cancel");
const plus1 = document.getElementsByTagName("button")[0];
const plus2 = document.getElementsByTagName("button")[1];
const checkBox = document.querySelector("#deposit-check");
const additionalIncomes = document.querySelectorAll(".additional_income-item");
const results = document.getElementsByClassName("result")[0].querySelectorAll("input");
const salaryAmount = document.querySelector('.salary-amount');
const addIncomeItems = document.querySelectorAll('.additional_income-item');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll(".expenses-items");
const addExpenses = document.querySelector('.additional_expenses');
const targetAmount = document.querySelector('.target-amount');
const addExpensesItem = document.querySelector('.additional_expenses-item');
const periodSelect = document.querySelector(".period-select");
let incomeItems = document.querySelectorAll(".income-items");
const inputsTitle = document.querySelectorAll("input[placeholder='Наименование']");
const inputsAmount = document.querySelectorAll("input[placeholder='Сумма']");


let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function() {
  this.budget = 0;
  this.income = {};
  this.incomeMonths = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDoposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
}

AppData.prototype.start = function() {
  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
}

AppData.prototype.showResult = function() {
  const _this = this;
  results[0].value = this.budgetMonth;
  results[1].value = Math.floor(this.budgetDay);
  results[2].value = this.expensesMonth;
  results[3].value = this.addIncome.join(", ")
  results[4].value = this.addExpenses.join(", ");
  results[6].value = Math.ceil(this.getTargetMonth());
  results[5].value = this.calcPeriod();
  periodSelect.addEventListener("input",function() {
    results[5].value = _this.calcPeriod();
  });

};

AppData.prototype.addIncomesBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  let inputs = cloneIncomeItem.querySelectorAll("input");
  inputs[0].value = "";
  inputs[1].value = "";
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plus1);
  inputs[0].addEventListener("input",this.checkTitles);
  inputs[1].addEventListener("input",this.checkAmounts);
  incomeItems = document.querySelectorAll(".income-items");
  if(incomeItems.length === 3) {
    plus1.style.display = "none";
  }
};
AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  let inputs = cloneExpensesItem.querySelectorAll("input");
  inputs[0].value = "";
  inputs[1].value = "";
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plus2);
  inputs[0].addEventListener("input",this.checkTitles);
  inputs[1].addEventListener("input",this.checkAmounts);
  expensesItems = document.querySelectorAll(".expenses-items");
  if(expensesItems.length === 3) {
    plus2.style.display = "none";
  }
};
AppData.prototype.getIncome = function() {
  const _this = this;
  incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector(".income-title").value;
    let amountIncome = +item.querySelector(".income-amount").value;
    if (itemIncome !== "" && amountIncome !== "") {
      _this.income[itemIncome] = amountIncome;
    }
  });
  for (let key in this.income) {
    this.incomeMonths += +this.income[key];
  }
};
AppData.prototype.getExpenses = function() {
  const _this = this;
  expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = +item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getAddExpenses = function() {
  const _this = this;
  let addExpenses = addExpensesItem.value.split(",")
  addExpenses.forEach(function(item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
},
AppData.prototype.getAddIncome = function() {
  const _this = this;
  additionalIncomes.forEach(function(item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function() {
  let sum = 0;
  for(let key in this.expenses) {
    sum += this.expenses[key];
  }
  this.expensesMonth = sum;
};
AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonths - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function() {
  return targetAmount.value / this.budgetMonth;
  
};
AppData.prototype.calcPeriod = function() {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.setPeriod = function() {
  let periodTitle = document.querySelector(".title.period-amount");
  periodTitle.textContent = periodSelect.value;
};
AppData.prototype.blokedStartBtn = function() {
  if (salaryAmount.value.trim() !== "") {
    startBtn.removeAttribute("disabled")
    startBtn.style.cursor = "pointer";
  } else {
    startBtn.setAttribute("disabled","true");
    startBtn.style.cursor = "no-drop";
  }
};
AppData.prototype.checkTitles = function(event) {
  event.target.value = event.target.value.replace(/[^_\W]+/g, '');
};
AppData.prototype.checkAmounts = function(event) {
  event.target.value = event.target.value.replace(/[^0-9.]/g, '');
};
AppData.prototype.blokedDataInputs = function() {
  const dataInputs = document.querySelectorAll("input[type='text'],input[type=checkbox]");
  dataInputs.forEach(function(item) {
    item.setAttribute("disabled","true");
  });
  this.style.display = "none";
  cancelBtn.style.display = "block";
};
AppData.prototype.reset = function() {
  location.reload();
};

AppData.prototype.eventListenners = function() {
  startBtn.addEventListener("click",appData.start.bind(appData));
  startBtn.addEventListener("click",appData.blokedDataInputs);
  plus1.addEventListener("click",appData.addIncomesBlock.bind(appData));
  plus2.addEventListener("click",appData.addExpensesBlock.bind(appData));
  periodSelect.addEventListener("input",appData.setPeriod);
  salaryAmount.addEventListener("input",appData.blokedStartBtn);
  inputsTitle.forEach(function(item) {
    item.addEventListener("input",appData.checkTitles);
  });
  inputsAmount.forEach(function(item) {
    item.addEventListener("input",appData.checkAmounts);
  });
  cancelBtn.addEventListener("click",appData.reset);
  startBtn.setAttribute("disabled","true");
  startBtn.style.cursor = "no-drop";
};

const appData = new AppData();
appData.eventListenners();
console.log(appData)










