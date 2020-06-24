const button = document.querySelector("button");
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
button.addEventListener("click",function() {
  let color = Math.floor(Math.random() * 16777216).toString(16);
  color = "#000000".slice(0,-color.length) + color;
  h1.textContent = color;
  body.style.backgroundColor = color;
  button.style.color = color;
})