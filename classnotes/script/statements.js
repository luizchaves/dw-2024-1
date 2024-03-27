// statements (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)

// https://dorey.github.io/JavaScript-Equality-Table/
// Falsy = null, undefined, false, NaN, 0, -0, 0n, '';
// Truthy = !Falsy
// if
const number = 10;

if (number > 0) console.log('This number is positive');

// if..else
if (number > 0) {
  console.log('This number is positive');
} else {
  console.log('This number is negative or zero');
}

// if..else if..else
if (number > 0) {
  console.log('This number is positive');
} else if (number < 0) {
  console.log('This number is negative');
} else {
  console.log('This number is zero');
}

// switch
const value1 = 10;
const value2 = 5;
const operator = '+'; // +, -

if (operator === '+') {
  console.log(value1 + value2);
} else if (operator === '-') {
  console.log(value1 - value2);
} else {
  console.log('This operator is invalid');
}

switch (operator) {
  case '+':
    console.log(value1 + value2);
    break;
  case '-':
    console.log(value1 - value2);
    break;
  default:
    console.log('This operator is invalid');
}

// while
let flag = 0;

while (flag < 10) {
  console.log(flag);
  flag++;
}

// do..while
flag = 0;

do {
  console.log(flag);
  flag++;
} while (flag < 10);

// for
for (let flag = 0; flag < 10; flag++) {
  console.log(flag);
}

// 00, 01, ..., 09
// 10, 11, ..., 19
// ...
// 90, 91, ... 99

// 90, 91, ... 99
// ...
// 10, 11, ..., 19
// 00, 01, ..., 09

// for for
