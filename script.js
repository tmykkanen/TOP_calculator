const calcState = {
  firstNum: null,
  secondNum: null,
  operation: null,
  displayValue: 0,
  lastOp: {
    lastSecondNum: null,
    lastOperation: null,
  },
};

let {
  firstNum,
  secondNum,
  operation,
  displayValue,
  lastOp,
} = calcState;

const numPad = document.querySelector('#numPad');
const operators = document.querySelector('#opPad');
const display = document.querySelector('#display');

const updateDisplay = () => {
  // TODO: Move logic for updating display here.
  display.textContent = displayValue;
};

const resetCalc = () => {
  firstNum = null;
  secondNum = null;
  operation = null;
  displayValue = 0;
  updateDisplay();
};

// basic maths
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (first, second, op) => {
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
  const numPressed = e.target.id;

  if (firstNum == null) {
    // firstNum empty
    firstNum = numPressed;
    displayValue = firstNum;
  } else if (operation == null) {
    // add to existing firstNum
    firstNum += numPressed;
    displayValue = firstNum;
  } else if (secondNum == null) {
    // secondNum empty
    secondNum = numPressed;
    displayValue = secondNum;
  } else {
    // add to existing secondNum
    secondNum += numPressed;
    displayValue = secondNum;
  }
};

const opPress = (e) => {
  const opPressed = e.target.id;

  // AC
  if (opPressed === 'ac') {
    resetCalc();
    return;
  }

  // EQUALS
  if (opPressed === '=' && operation == null) {
    return;
  }

  if (opPressed === '=') {
    if (secondNum == null) {
      if (lastOp.lastSecondNum != null) {
        secondNum = lastOp.lastSecondNum;
      } else {
        secondNum = firstNum;
      }
    }
    displayValue = operate(firstNum, secondNum, operation);
    firstNum = displayValue;
    lastOp.lastSecondNum = secondNum;
    lastOp.lastOperation = operation;
    secondNum = null;
  } else {
    // MATH OPS
    if (firstNum == null) {
      firstNum = 0;
    }

    if (secondNum != null) {
      displayValue = operate(firstNum, secondNum, operation);
      firstNum = displayValue;
      lastOp.lastSecondNum = secondNum;
      lastOp.lastOperation = operation;
      secondNum = null;
    }
    operation = opPressed;
  }
};

numPad.addEventListener('click', (e) => {
  numPress(e);
  updateDisplay();
});
operators.addEventListener('click', (e) => {
  opPress(e);
  updateDisplay();
});
