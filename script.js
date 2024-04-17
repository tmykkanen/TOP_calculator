// 6. Make the calculator work! You’ll need to store the first number and second number
// that are input into the calculator,
// utilize the operator that the user selects, and then operate() on the two numbers
// when the user presses the “=” key.
//    - You should already have the code that can populate the display,
//      so once operate() has been called, update the display with the ‘solution’ to the operation.
//   - This is the hardest part of the project. You need to figure out how to store all the values
//      and call the operate function with them. Don’t feel bad
// if it takes you a while to figure out the logic.

let firstNum = '';
let firstNumEntered = false;
let secondNumEntered = false;
let secondNum = '';
let operator = '';
let displayValue = 0;

const numPad = document.querySelector('#numPad');
const operators = document.querySelector('#opPad');
// const numKeys = Array.from(numPad.querySelectorAll('button'));
const display = document.querySelector('#display');

const updateDisplay = () => {
  display.textContent = displayValue;
};

const resetCalc = () => {
  firstNum = '';
  secondNum = '';
  operator = '';
  firstNumEntered = false;
  secondNumEntered = false;
  displayValue = 0;
  updateDisplay();
};

// basic maths
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (op, first, second) => {
  const a = +first;
  const b = +second;
  switch (op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: break;
  }
  return 'ERR';
};

const numPress = (e) => {
  // TODO: Fix misclick causing "numpad" to return.
  // LOGIC FOR NUMPAD
  const { id } = e.target;

  // // after AC, firstNumEntered = false => firstNum = id
  if (firstNumEntered === false) {
    firstNum = id;
    firstNumEntered = true;
    displayValue = firstNum;
    return;
  }

  // firstNumEnetered = true => firstNum += id
  if (firstNumEntered === true && operator === '') {
    firstNum += id;
    displayValue = firstNum;
    return;
  }

  // operator entered => secondNum += id
  if (firstNumEntered === true && operator !== '') {
    if (secondNumEntered === false) {
      secondNum = id;
      secondNumEntered = true;
      displayValue = secondNum;
      return;
    }
    secondNum += id;
    displayValue = secondNum;
  }
};

// LOGIC FOR OPS
//  (1) OPERATOR
//    if firstNumEntered = false,
//      set firstNum to display default (0) + firstNumEntered to true (0 * 3 = 0); set operator
//    if firstNumEntered = true, set operator
//    if secondNumEntered = true,
//      perform operation as if = pressed; update firstNum to display; reset operator + secondNum
//  (2) AC => Reset everything
//  (3) EQUALS
//    if all reset, do nothing | if only firstNum, do nothing
//    if firstNum + operator set, assume firstNum = secondNum and perform operation
//    if operator set and equals set, do op again (e.g. 7 * 5 = 35 = 175 (35 * 5))
// FUNC SET READY STATE: display = firstNum, operator remains same; secondNum = empty

const opPress = (e) => {
  const { id } = e.target;

  // CLEAR
  if (id === 'ac') {
    resetCalc();
    return;
  }

  // EQUALS
  if (id === '=') {
    // if all reset, do nothing | if only firstNum, do nothing
    if (firstNumEntered === false || (firstNumEntered === true && operator === '')) {
      return;
    }
    // if firstNum + operator set, assume firstNum = secondNum and perform operation
    if (secondNumEntered === false) {
      secondNum = firstNum;
      secondNumEntered = true;
    }
    displayValue = operate(operator, firstNum, secondNum);
    // if operator set and equals set, do op again (e.g. 7 * 5 = 35 = 175 (35 * 5))
    // op * | first 35 | second 5
    firstNum = displayValue;
    updateDisplay();
    return;
  }

  // OPERATIONS
  // OPERATOR: if firstNumEntered = false,
  //  set firstNum to display default (0) + firstNumEntered to true (0 * 3 = 0); set operator
  if (firstNumEntered === false) {
    firstNum = displayValue;
    firstNumEntered = true;
    operator = id;
    return;
  }
  // OPERATOR: if secondNumEntered = true,
  //  perform operation as if = pressed; update firstNum to display; reset operator + secondNum
  if (firstNumEntered === true && secondNumEntered === true) {
    if (operator !== id) {
      operator = id;
      secondNum = '';
      secondNumEntered = false;
      return;
    }
    displayValue = operate(operator, firstNum, secondNum);
    firstNum = displayValue;
    updateDisplay();
    return;
  }
  // OPERATOR: if firstNumEntered = true + second = false, set operator
  operator = id;
};

numPad.addEventListener('click', (e) => {
  numPress(e);
  updateDisplay();
});
operators.addEventListener('click', (e) => {
  opPress(e);
});

// TESTS
// console.log(`sub 7 - 2: ${operate('-', 7, 2)}`);
// console.log(`add 3 + 4: ${operate('+', 3, 4)}`);
// console.log(`mult 7 * 2: ${operate('*', 7, 2)}`);
// console.log(`div 21 * 3: ${operate('/', 21, 3)}`);
// console.log(`err: ${operate('t', 21, 3)}`);
