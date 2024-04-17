// operations logic
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Create a new function operate that takes an operator and 2 numbers
// and then calls one of the above functions on the numbers.
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

// calculator logic
// const numPress = (a) => {
//   // let statement for testing purposes; use global vars in actual program
//   let {
//     firstNum,
//     secondNum,
//     operation,
//     numberPressed,
//   } = a;

//   if (firstNum == null) {
//     firstNum = numberPressed;
//     return firstNum;
//   }
//   if (firstNum != null && operation == null) {
//     firstNum += numberPressed;
//     return firstNum;
//   }
//   if (firstNum != null && operation != null && secondNum == null) {
//     secondNum = numberPressed;
//     return secondNum;
//   }
//   if (firstNum != null && operation != null && secondNum !== null) {
//     secondNum += numberPressed;
//     return secondNum;
//   }
//   return 'ERR';
// };

// REFACTORED USING ELSE IF
const numPress = (a) => {
  // *** TESTING
  let {
    firstNum,
    secondNum,
    operation,
    numberPressed,
  } = a;
  // *** TESTING

  if (firstNum == null) {
    // firstNum empty
    firstNum = numberPressed;
  } else if (operation == null) {
    // add to existing firstNum
    firstNum += numberPressed;
  } else if (secondNum == null) {
    // secondNum empty
    secondNum = numberPressed;
  } else {
    // add to existing secondNum
    secondNum += numberPressed;
  }

  // *** TESTING
  const results = {
    firstNum,
    secondNum,
    operation,
    numberPressed,
  };
  return results;
  // *** TESTING
};

const resetCalc = () => {
  const reset = {
    firstNum: null,
    secondNum: null,
    operator: null,
    displayValue: 0,
  };
  return reset;
};

const opPress = (a) => {
  // *** TESTING
  let {
    firstNum,
    secondNum,
    operation,
    opPressed,
    displayValue,
  } = a;
  // *** TESTING

  if (opPressed === 'ac') {
    return resetCalc();
  }

  if (opPressed === '=' && secondNum == null) {
    secondNum = firstNum;
  }

  if (opPressed === '=') {
    displayValue = operate(firstNum, secondNum, operation);
    firstNum = displayValue;
  }

  

  // *** TESTING
  const results = {
    firstNum,
    secondNum,
    operation,
    opPressed,
    displayValue,
  };
  return results;
  // *** TESTING
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  operate,
  numPress,
  opPress,
};
