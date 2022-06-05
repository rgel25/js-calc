const Calc = class {
  constructor(display) {
    this.display = display;
    this.clear();
  }

  enterNum(num) {
    if (this.current.length > 10) return;
    if (num == "." && this.current.includes(".")) return;
    if (display.textContent.trim()[0] == 0) this.current = "";
    this.current += num;
  }

  enterOperator(operator) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.current = this.formatNum(this.compute());
    }
    this.operator = operator;
    this.previous = this.current;
    this.current = "";
  }

  del() {
    if (this.current.length < 1) return;
    this.current = this.current.toString().slice(0, -1);
  }

  compute() {
    if (this.operator == "+") return +this.previous + +this.current;
    if (this.operator == "-") return +this.previous - +this.current;
    if (this.operator == "x") return +this.previous * +this.current;
    if (this.operator == "/") return +this.previous / +this.current;
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operator = "";
  }

  formatNum(num) {
    return num.toFixed(4).replace(/[.,]0000$/, "");
  }

  equals() {
    if (!this.current || !this.previous) return;
    let answer = this.compute();
    this.display.textContent = `${this.display.textContent} = ${this.formatNum(
      answer
    )}`;
    this.clear();
  }

  updateDisplay() {
    const expression = [this.previous, this.operator, this.current];
    this.display.textContent = expression.join(" ");
  }

  init() {
    this.updateDisplay();
  }
};

const display = document.querySelector(".display");
const keyPad = document.querySelector(".keypad-container");

const calc = new Calc(display);
calc.init();

keyPad.addEventListener("click", (e) => {
  //    Delegate event
  const click = e.target.closest(".keypad-btn");
  //   Guard clause
  if (!click) return;
  const button = click.children[0];
  //   if btn = reset
  if (button.classList.contains("clear")) {
    calc.clear();
    calc.updateDisplay();
  }
  //   if btn = num
  if (button.classList.contains("number")) {
    calc.enterNum(button.textContent);
    calc.updateDisplay();
  }

  //   if btn = operator
  if (button.classList.contains("operator")) {
    calc.enterOperator(button.textContent);
    calc.updateDisplay();
  }
  // If btn = equals
  if (button.classList.contains("equals")) {
    calc.equals();
  }
  if (button.classList.contains("delete")) {
    calc.del();
    calc.updateDisplay();
  }
});
