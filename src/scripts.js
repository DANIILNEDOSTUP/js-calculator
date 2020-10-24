/* Math operations */
let equation = '0';
let previousEquation = '0';
let previousOperator = '';

const {add, substract, multiply, divide, roundResult} = require('./arithmetics');

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
const removeLastEquationChar = () => Number(equation.slice(0, -1));
const isPreviousCharOperator = () => isNaN(getLastEquationChar());
const isPreviousCharDot = () => getLastEquationChar() == '.';

const resetCache = () => {
  previousEquation = '0';
  previousOperator = '';
};

const clearEquation = () => {
  resetCache();
  equation = '0';
  updateDisplay();
  removeActiveOperatorStyle();
};

const backspaceEquation = () => {
  if (isPreviousCharOperator()) removeActiveOperatorStyle(); // Removes button styling if last character is an operator (undo operator effect)
  equation = equation.length > 1 ? equation.slice(0, -1) : '0'; // Assigns '0' when last character is removed
  updateDisplay();
};

/* Equation inputs functions */
const addNumber = (num) => {
  if (isPreviousCharOperator() && !isPreviousCharDot()) {
    // If adding numbers after operator, store previous data, re-initialize equation
    previousOperator = getLastEquationChar();
    previousEquation = removeLastEquationChar();
    equation = '0';
  }
  equation == '0' ? (equation = num) : (equation += num);
  updateDisplay();
};

const addOperator = (operatorKey) => {
  const actualOperator = operatorKey.textContent;
  const lastEquationChar = getLastEquationChar();
  if (isPreviousCharOperator()) {
    // If two operators added in a row, remove previous one (needed for solving evaluation or replacing)
    equation = removeLastEquationChar();
    if (lastEquationChar === actualOperator)
      solveEquation(actualOperator, equation);
  } else if (previousOperator)
    // If operator added when there's already one in the equation, solve it first
    solveEquation(previousOperator, previousEquation);

  removeActiveOperatorStyle();
  addActiveOperatorStyle(operatorKey);
  equation += actualOperator; // Add (when equation solved) or replace operator
};

const addDot = () => {
  if (!equation.includes('.')) equation += '.';
  updateDisplay();
};

const solveEquation = (
  operator = previousOperator,
  actualEquation = previousEquation
) => {
  if (operator) {
    equation = operate(operator, actualEquation, equation);
    updateDisplay();
    if (equation === 'Err') equation = '0'; // Reset equation when operate returns 'Err'
    removeActiveOperatorStyle();
  }
  resetCache();
};

/* Key-click handlers */
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
equalKey.addEventListener('click', () => solveEquation());
dotKey.addEventListener('click', addDot);

/* Keyboard-press handlers */

document.addEventListener('keydown', function (e) {
  const numRegExp = /^[0-9]*$/;
  const symbol = e.key;
  const keyboardKeySymbols = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '+',
    '-',
    '/',
    '*',
    '.',
    '=',
    'Enter',
    'Backspace',
    'Delete',
  ];

  if (keyboardKeySymbols.includes(symbol)) {
    e.preventDefault;
    if (numRegExp.test(symbol)) {
      addNumber(symbol);
    } else {
      switch (symbol) {
        case '+':
          addOperator(document.querySelector('.add'));
          break;
        case '-':
          addOperator(document.querySelector('.substract'));
          break;
        case '*':
          addOperator(document.querySelector('.multiply'));
          break;
        case '/':
          addOperator(document.querySelector('.divide'));
          break;
        case '.':
          addDot();
          break;
        case 'Backspace':
          backspaceEquation();
          break;
        case 'Delete':
          clearEquation();
          break;
        case 'Enter':
        case '=':
          solveEquation();
          break;
      }
    }
  }
});
