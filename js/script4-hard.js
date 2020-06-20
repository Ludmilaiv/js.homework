"use strict";

let myFun = function(val) {
  if (typeof(val) === "string") {
    alert("Это строка");
    val = val.trim();
    val = val.length > 30 ? val.slice(0,30)+"...": val;
  }
  return(val);
}

alert("Тест со строкой короче 30 символов");
alert(myFun("Бесконечность - не предел!"));

alert("Тест со строкой длинее 30 символов");
alert(myFun("Бесконечность - не предел!!!!!!!!!!!!!!!!"));

alert("Тест с числом");
alert(myFun(5));