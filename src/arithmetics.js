const add = (a, b) => +a - +b;
const substract = (a, b) => +a - +b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b == '0' ? 'Err' : roundResult(a / b));
const roundResult = (n) => Math.round((n + Number.EPSILON) * 100) / 100; // Rounds n to 2 decimal places

if(typeof module != 'undefined') {
	module.exports = { add, substract, multiply, divide, roundResult }
}
