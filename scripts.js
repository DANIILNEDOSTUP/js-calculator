/* Math operations */
let equation = '0';
let previousEquation;
let previousOperator;

const add = (a, b) => +a + +b;
const substract = (a, b) => +a - +b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b == '0' ? 'Err' : roundResult(a / b));
const roundResult = (n) => Math.round((n + Number.EPSILON) * 100) / 100; // Rounds n to 2 decimal places

const operate = (operator, a, b = a) => {
  // Returns strings for easier operators evaluation
  switch (operator) {
    case '+':
      return String(roundResult(add(Number(a), Number(b))));
    case '-':
      return String(roundResult(substract(Number(a), Number(b))));
    case '×':
      return String(roundResult(multiply(Number(a), Number(b))));
    case '÷':
      return String(divide(Number(a), Number(b)));
  }
};

/* DOM Elements */
const numKeys = Array.from(document.querySelectorAll('.num'));
const operatorKeys = Array.from(document.querySelectorAll('.operator'));
const clearKey = document.querySelector('.clear');
const backspaceKey = document.querySelector('.backspace');
const dotKey = document.querySelector('.dot');
const equalKey = document.querySelector('.equal');
const calcDisplay = document.querySelector('.calc-display');

/* Display management */
const updateDisplay = () => (calcDisplay.value = equation);

/* Interface dynamic styling */
const addActiveOperatorStyle = (e) => e.classList.add('active');

const removeActiveOperatorStyle = () => {
  operatorKeys.forEach((e) => {
    e.classList.remove('active');
  });
};

/* Equation complementary functions */
const getLastEquationChar = () => [...equation].pop(); // Returns last character from the actual equation
const isPreviousCharOperator = () => isNaN(getLastEquationChar());
const removeLastEquationChar = () => Number(equation.slice(0, -1));

const resetCache = () => {
  previousEquation = undefined;
  previousOperator = undefined;
};

const clearEquation = () => {
  removeActiveOperatorStyle();
  resetCache();
  equation = '0';
  updateDisplay();
};

const backspaceEquation = () => {
  if (isNaN(getLastEquationChar())) removeActiveOperatorStyle(); // Removes button styling if last character in equation is an operator
  equation = equation.length > 1 ? equation.slice(0, -1) : '0'; // Removes previous character unless there's only 1; in which case assigns 0
  updateDisplay();
};

/* Equation inputs functions */
const addNumber = (num) => {
  if (isPreviousCharOperator()) {
    // If adding numbers after operator, store previous data, re-initialize equation
    previousOperator = getLastEquationChar();
    previousEquation = removeLastEquationChar();
    equation = '0';
  }
  equation == '0' ? (equation = num) : (equation += num); // If equation has been initialized, replace 0 for 'num'; else concatenates number
  updateDisplay();
};

const addOperator = (operatorKey) => {
  removeActiveOperatorStyle();
  addActiveOperatorStyle(operatorKey);
  const actualOperator = operatorKey.textContent;

  const lastEquationChar = getLastEquationChar();
  if (isPreviousCharOperator()) {
    equation = removeLastEquationChar();
    if (actualOperator == lastEquationChar)
      equation = operate(actualOperator, equation, previousEquation);
  } else if (previousEquation) {
    equation = operate(previousOperator, previousEquation, equation);
  }
  resetCache();
  updateDisplay();
  equation += actualOperator;
};

const resolveEquation = () => {
  removeActiveOperatorStyle();

  const lastEquationChar = getLastEquationChar();
  if (isPreviousCharOperator()) {
    equation = removeLastEquationChar();
    equation = operate(lastEquationChar, equation, previousEquation);
  } else if (previousEquation) {
    equation = operate(previousOperator, previousEquation, equation);
  }
  resetCache();
  updateDisplay();
};

/* Key handlers initialization */
numKeys.forEach((numKey) => {
  numKey.addEventListener('click', (e) => {
    addNumber(e.target.textContent);
  });
});

operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener('click', (e) => {
    addOperator(e.target);
  });
});

clearKey.addEventListener('click', clearEquation);
backspaceKey.addEventListener('click', backspaceEquation);
equalKey.addEventListener('click', resolveEquation);
