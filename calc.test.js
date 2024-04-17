/**
 * @jest-environment jsdom
 */

const {
  add,
  multiply,
  subtract,
  divide,
  operate,
  numPress,
  operateMod,
} = require('./calc');

let {
  firstNum,
} = require('./calc');


// test calculator operations
it('adds 1 + 2 = 3', () => {
  expect(add(1, 2)).toBe(3);
});

it('subtracts 4 - 1 = 3', () => {
  expect(subtract(4, 1)).toBe(3);
});

it('multiplies 4 * 2 = 8', () => {
  expect(multiply(4, 2)).toBe(8);
});

it('divides 8 / 2 = 4', () => {
  expect(divide(8, 2)).toBe(4);
});

it('call an operate function on two numbers based on operator variable', () => {
  expect(operate(1, 2, '+')).toBe(3);
  expect(operate(4, 1, '-')).toBe(3);
  expect(operate(4, 2, '*')).toBe(8);
  expect(operate(8, 2, '/')).toBe(4);
});

it('on numPress, edit firstNum', () => {
  const numPressOne = 4;
  expect(numPressOne).toBe(4);
  expect(numPress(numPressOne)).toBe(4);
});

// set defaults - firstNum; secondNum; operation
// On numPress
//  if operation is '', edit FIRSTNUM
//  if operation is set, edit SECONDNUM
// On equals
//  if firstNum and secondNum are set, operate
//  if firstNum and operator are set, operate with FIRSTNUM = SECONDNUM (TODO: FUNC)
// On operator
//  if operator set, operate w/ FIRSTNUM = SECONDNUM (SEE FUNC)
//  if operator not set, set operator

// After operate
//  set solution = firstNum; reset secondNum and operator

// modify operate to call global variables
it('call an operate function on two numbers based on operator variable', () => {
  firstNum = 1;
  console.log(`in test: ${firstNum}`);
  let secondNum = 2;
  let operation = '+';
  expect(firstNum).toBe(1);
  expect(operateMod()).toBe(3);
});