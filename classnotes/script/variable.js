// without declaration keyword
// ReferenceError: variable is not defined
// console.log(variable);

variable = 10;
console.log(variable);

// const
// ReferenceError: Cannot access 'number' before initialization
// console.log(number);

const number = 10;

console.log(number);

// not mutable
// TypeError: Assignment to constant variable.
// number = 100;

// Cannot redeclare block-scoped variable 'number'
// SyntaxError: Identifier 'number' has already been declared
// const number = 100;

function doSomething() {
  const number = 10;
}

// let
// let value = 10;
let value; // undefined

// reassignment
value = 100;
console.log(value);

// dynamic types
value = 'Hello';
console.log(value);

// var
var variable = 10;

var variable = 10;

// case sensitive
const Number = 10;

// weak type
const name = 'variable';
console.log(name + '1');
console.log(name + true);
