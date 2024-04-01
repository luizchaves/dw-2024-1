// function declaration
function sum(a, b) {
  return a + b;
}

// call function
console.log(sum(1)); //=> NaN
console.log(sum(1, 1)); //=> 2
console.log(sum(1, 1, 1)); //=> 2

// anonymous/lambda function
const subtraction = function (a, b) {
  return a - b;
};

console.log(subtraction(1, 1)); //=> 0

// arrow function
const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(2, 2)); //=> 4

const divide = (a, b) => a / b;

console.log(divide(4, 2)); //=> 2

// default param
const pow = (a, b = 1) => a ** b;

console.log(pow(2, 2)); //=> 4
console.log(pow(2)); //=> 2

// rest param
function summation(...values) {
  let sum = 0;

  for (const value of values) {
    sum += value;
  }

  return sum;
}

console.log(summation(1)); //=> 1
console.log(summation(1, 1)); //=> 2
console.log(summation(1, 1, 1)); //=> 3

// callback function
function calc(a, b, callback) {
  return callback(a, b);
}

console.log(calc(1, 1, (a, b) => a + b)); //=> 2
console.log(calc(1, 1, (a, b) => a - b)); //=> 0
console.log(calc(1, 1, (a, b) => a * b)); //=> 1
console.log(calc(1, 1, (a, b) => a / b)); //=> 1
