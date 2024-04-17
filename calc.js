// initialize variables
let firstNum = 'a';
let secondNum = '';
let operation  = '';

// operations logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Create a new function operate that takes an operator and 2 numbers
// and then calls one of the above functions on the numbers.
const operate = (a, b, op) => {
  switch (op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: break;
  }
  return 'ERR';
};

const operateMod = () => {
  console.log(firstNum);
  console.log(secondNum);
  return add(firstNum, secondNum);
};

// calculator logic
const numPress = (a) => {
  const firstNum = a;
  return firstNum;
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  operate,
  numPress,
  operateMod,
  firstNum,
};
