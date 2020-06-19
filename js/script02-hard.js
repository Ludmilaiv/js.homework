let num = 266219;
strNum = String(num);
console.log(strNum);
let result = 1;
for (let i in strNum) {
  result *= strNum[i];
}
console.log("Произведение цифр числа = " + result);
result = result ** 3;
console.log("Результат в третьей степени = " + result);
console.log("Первые две цифры полученного числа " + String(result).slice(0,2));
