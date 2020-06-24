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

let appData = {
  budget: 0,
  income: {},
  incomeMonths: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDoposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
   
  },
  showResult: function() {
    results[0].value = this.budgetMonth;
    results[1].value = Math.floor(this.budgetDay);
    results[2].value = this.expensesMonth;
    results[3].value = this.addIncome.join(", ")
    results[4].value = this.addExpenses.join(", ");
    results[6].value = Math.ceil(this.getTargetMonth());
    results[5].value = this.calcPeriod();
    periodSelect.addEventListener("input",function() {
      results[5].value = appData.calcPeriod();
    });

  },
  addIncomesBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let inputs = cloneIncomeItem.querySelectorAll("input");
    inputs[0].value = "";
    inputs[1].value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plus1);
    inputs[0].addEventListener("input",appData.checkTitles);
    inputs[1].addEventListener("input",appData.checkAmounts);
    incomeItems = document.querySelectorAll(".income-items");
    if(incomeItems.length === 3) {
      plus1.style.display = "none";
    }
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let inputs = cloneExpensesItem.querySelectorAll("input");
    inputs[0].value = "";
    inputs[1].value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plus2);
    inputs[0].addEventListener("input",appData.checkTitles);
    inputs[1].addEventListener("input",appData.checkAmounts);
    expensesItems = document.querySelectorAll(".expenses-items");
    if(expensesItems.length === 3) {
      plus2.style.display = "none";
    }
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector(".income-title").value;
      let amountIncome = +item.querySelector(".income-amount").value;
      if (itemIncome !== "" && amountIncome !== "") {
        appData.income[itemIncome] = amountIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonths += +this.income[key];
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = +item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getAddExpenses: function() {
    let addExpenses = addExpensesItem.value.split(",")
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomes.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function() {
    let sum = 0;
    for(let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  },
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonths - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getTargetMonth: function() {
    return targetAmount.value / this.budgetMonth;
    
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
  },
  getInfoDeposit: function() {
    if(appData.deposit) {
      do {
        appData.percentDoposit = prompt("Какой годовой процент депозита?", "10");
      } while (!isNumber(appData.percentDoposit));
      do {
        appData.moneyDoposit = prompt("Какая сумма заложена?", "10000");
      } while (!isNumber(appData.moneyDoposit));
      
    }
  },
  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;
  },
  setPeriod: function() {
    let periodTitle = document.querySelector(".title.period-amount");
    periodTitle.textContent = periodSelect.value;
  },
  blokedStartBtn: function() {
    if (salaryAmount.value.trim() !== "") {
      startBtn.removeAttribute("disabled")
      startBtn.style.cursor = "pointer";
    } else {
      startBtn.setAttribute("disabled","true");
      startBtn.style.cursor = "no-drop";
    }
  },
  checkTitles: function(event) {
    event.target.value = event.target.value.replace(/[^_\W]+/g, '');
  },
  checkAmounts: function(event) {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
  },
  blokedDataInputs: function() {
    const dataInputs = document.querySelectorAll("input[type='text'],input[type=checkbox]");
    dataInputs.forEach(function(item) {
      item.setAttribute("disabled","true");
    });
    this.style.display = "none";
    cancelBtn.style.display = "block";
  },
  reset: function() {
    location.reload();
  }
};

startBtn.addEventListener("click",function(){appData.start()});
startBtn.addEventListener("click",appData.blokedDataInputs);
plus1.addEventListener("click",appData.addIncomesBlock);
plus2.addEventListener("click",appData.addExpensesBlock);
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








