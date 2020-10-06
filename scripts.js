function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  let result;
  switch (operator) {
    case 'add':
      result = add(a, b);
      break;

    case 'substract':
      result = substract(a, b);
      break;

    case 'multiply':
      result = multiply(a, b);
      break;

    case 'divide':
      result = divide(a, b);
      break;

    default:
      break;
  }
  return result;
}
