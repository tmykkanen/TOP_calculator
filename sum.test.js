const { sum, diff } = require('./sum');

it('sums 3 + 2 to be 5', () => {
  expect(sum(3, 2)).toBe(5);
});

it ('diffs 5 - 1 to 4', () => {
  expect(diff(5, 1)).toBe(4);
});
