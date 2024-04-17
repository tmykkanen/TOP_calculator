/* eslint-disable no-undef */
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
  opPress,
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

// set defaults - firstNum; secondNum; operation
// On numPress
//  if FIRSTNUM = missing
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

// Check branching logic

describe('Test numPress', () => {
  // FIRST NUMER
  test('firstNum is null', () => {
    const calcState = {
      firstNum: null,
      secondNum: null,
      operation: null,
      numberPressed: '2',
    };
    expect(numPress(calcState).firstNum).toBe('2');
  });
  test('firstNum has value, but operate is null', () => {
    const calcState = {
      firstNum: '2',
      secondNum: null,
      operation: null,
      numberPressed: '4',
    };
    expect(numPress(calcState).firstNum).toBe('24');
  });
  test('works with larger firstNum values', () => {
    const calcState = {
      firstNum: '2123',
      secondNum: null,
      operation: null,
      numberPressed: '4',
    };
    expect(numPress(calcState).firstNum).toBe('21234');
  });

  // SECOND NUMBER
  test('firstNum & operate have value; secondNum is null', () => {
    const calcState = {
      firstNum: '24',
      secondNum: null,
      operation: '+',
      numberPressed: '8',
    };
    expect(numPress(calcState).secondNum).toBe('8');
  });
  test('secondNum has value', () => {
    const calcState = {
      firstNum: '24',
      secondNum: '8',
      operation: '+',
      numberPressed: '7',
    };
    expect(numPress(calcState).secondNum).toBe('87');
  });
  test('Works with larger secondNum values', () => {
    const calcState = {
      firstNum: '24',
      secondNum: '8123',
      operation: '+',
      numberPressed: '7',
    };
    expect(numPress(calcState).secondNum).toBe('81237');
  });
});

describe('Test opPress', () => {
  test('recognizes AC and properly clears calculator', () => {
    const calcState = {
      firstNum: null,
      secondNum: null,
      operation: null,
      opPressed: 'ac',
    };
    const clear = opPress(calcState);
    expect(clear.firstNum).toBe(null);
    expect(clear.secondNum).toBe(null);
    expect(clear.operator).toBe(null);
    expect(clear.displayValue).toBe(0);
  });
  test('perform operatons when equals is pressed with both numbers and operator set', () => {
    const calcState = {
      firstNum: '4',
      secondNum: '2',
      operation: '+',
      opPressed: '=',
      displayValue: '2',
    };
    expect(opPress(calcState).displayValue).toBe(6);
    calcState.operation = '-';
    expect(opPress(calcState).displayValue).toBe(2);
    calcState.operation = '*';
    expect(opPress(calcState).displayValue).toBe(8);
    calcState.operation = '/';
    expect(opPress(calcState).displayValue).toBe(2);
  });
  test('perform operatons when equals is pressed with first number and operator set', () => {
    const calcState = {
      firstNum: '10',
      secondNum: null,
      operation: '+',
      opPressed: '=',
      displayValue: '10',
    };
    expect(opPress(calcState).displayValue).toBe(20);
    calcState.operation = '-';
    expect(opPress(calcState).displayValue).toBe(0);
    calcState.operation = '*';
    expect(opPress(calcState).displayValue).toBe(100);
    calcState.operation = '/';
    expect(opPress(calcState).displayValue).toBe(1);
  });
  test('after op, set displayValue to firstNum, keep operation, and set secondNum to null', () => {
    const calcState = {
      firstNum: '10',
      secondNum: '2',
      operation: '+',
      opPressed: '=',
      displayValue: '2',
    };
    expect(opPress(calcState).firstNum).toBe(12);
    expect(opPress(calcState).operation).toBe('+');
  });
  test('equals pressed multiple times in a row', () => {
    const calcState = {
      firstNum: '10',
      secondNum: '2',
      operation: '+',
      opPressed: '=',
      displayValue: '2',
    };
    const calcStateTwo = opPress(calcState);
    expect(opPress(calcStateTwo).displayValue).toBe(14);
    expect(opPress(opPress(calcStateTwo)).displayValue).toBe(16);
  });
});

//  (3) EQUALS
//    if all reset, do nothing | if only firstNum, do nothing
//    if firstNum + operator set, assume firstNum = secondNum and perform operation
// After op
// if operator set and equals set, do op again (e.g. 7 * 5 = 35 = 175 (35 * 5))
