/* eslint-disable no-console */
/* eslint-disable max-len */

// 6. Make the calculator work! You’ll need to store the first number and second number that are input into the calculator,
// utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key.
//   - You should already have the code that can populate the display, so once operate() has been called,
// update the display with the ‘solution’ to the operation.
//   - This is the hardest part of the project. You need to figure out how to store all the values
// and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

// LOGIC
let firstNum = '';
let secondNum = '';
let operator = '';
let displayValue;

const numPad = document.querySelector('#numPad');
const operators = document.querySelector('#opPad');
const numKeys = Array.from(numPad.querySelectorAll('button'));
const display = document.querySelector('#display');

// press number (need to listen for and store user selection) - and update display
const updateDisplay = (num) => {
  displayValue = num;
  display.textContent = displayValue;
};

// basic maths
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (op, first, second) => {
  console.log(`First: ${first} | Second: ${second}`);
  const a = +first;
  const b = +second;
  console.log(`a: ${a} | b: ${b}`);
  if (op === '+') return add(a, b);
  if (op === '-') return subtract(a, b);
  if (op === '*') return multiply(a, b);
  if (op === '/') return divide(a, b);
  return 'ERR';
};

const numPress = (e) => {
  const { id } = e.target;
  console.log(id);
  if (operator === '') {
    firstNum += id;
    updateDisplay(firstNum);
  } else {
    secondNum += id;
    updateDisplay(secondNum);
  }
};

const opPress = (e) => {
  const { id } = e.target;
  if (id === '=') {
    console.log('Equals!');
    updateDisplay(operate(operator, firstNum, secondNum));
  } else {
    operator = id;
  }
};
// press operation (need to listen for and store user selection) - no display update
// press number (need to listen for and store user selection) - and update display
// press equals (need to listen for and store user selection) - and update display with operation
  // EQUALS calls operate + returns answer

numPad.addEventListener('click', (e) => {
  numPress(e);
});
operators.addEventListener('click', (e) => {
  opPress(e);
});

// TESTS
console.log(`sub 7 - 2: ${operate('-', 7, 2)}`);
console.log(`add 3 + 4: ${operate('+', 3, 4)}`);
console.log(`mult 7 * 2: ${operate('*', 7, 2)}`);
console.log(`div 21 * 3: ${operate('/', 21, 3)}`);
console.log(`err: ${operate('t', 21, 3)}`);
