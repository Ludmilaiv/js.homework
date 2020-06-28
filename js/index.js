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


const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
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
  };

  start() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  }

  showResult() {
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

  addIncomesBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    const inputs = cloneIncomeItem.querySelectorAll("input");
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

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    const inputs = cloneExpensesItem.querySelectorAll("input");
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

  getIncome() {
    incomeItems.forEach(item => {
      const itemIncome = item.querySelector(".income-title").value;
      const amountIncome = +item.querySelector(".income-amount").value;
      if (itemIncome !== "" && amountIncome !== "") {
        this.income[itemIncome] = amountIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonths += +this.income[key];
    }
  };

  getExpenses() {
    expensesItems.forEach(item => {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = +item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  };

  getAddExpenses() {
    const addExpenses = addExpensesItem.value.split(",")
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  };

  getAddIncome() {
    additionalIncomes.forEach(item => {
      const itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  };

  getExpensesMonth() {
    let sum = 0;
    for(let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  };

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonths - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  };

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  };

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  };

  setPeriod() {
    const periodTitle = document.querySelector(".title.period-amount");
    periodTitle.textContent = periodSelect.value;
  };

  blokedStartBtn() {
    if (salaryAmount.value.trim() !== "") {
      startBtn.removeAttribute("disabled")
      startBtn.style.cursor = "pointer";
    } else {
      startBtn.setAttribute("disabled","true");
      startBtn.style.cursor = "no-drop";
    }
  };

  checkTitles(event) {
    event.target.value = event.target.value.replace(/[^_\W]+/g, '');
  };

  checkAmounts(event) {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
  };

  blokedDataInputs() {
    const dataInputs = document.querySelectorAll("input[type='text'],input[type=checkbox]");
    dataInputs.forEach(function(item) {
      item.setAttribute("disabled","true");
    });
    this.style.display = "none";
    cancelBtn.style.display = "block";
  };

  reset() {
    location.reload();
  };
  
  eventListenners() {
    startBtn.addEventListener("click",appData.start.bind(appData));
    startBtn.addEventListener("click",appData.blokedDataInputs);
    plus1.addEventListener("click",appData.addIncomesBlock.bind(appData));
    plus2.addEventListener("click",appData.addExpensesBlock.bind(appData));
    periodSelect.addEventListener("input",appData.setPeriod);
    salaryAmount.addEventListener("input",appData.blokedStartBtn);
    inputsTitle.forEach((item) => {
      item.addEventListener("input",appData.checkTitles);
    });
    inputsAmount.forEach((item) => {
      item.addEventListener("input",appData.checkAmounts);
    });
    cancelBtn.addEventListener("click",appData.reset);
    startBtn.setAttribute("disabled","true");
    startBtn.style.cursor = "no-drop";
  };
};

const appData = new AppData();
appData.eventListenners();
console.log(appData)


