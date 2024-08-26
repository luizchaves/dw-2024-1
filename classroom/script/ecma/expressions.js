// expression (commands: variable, literal, operator) => (value)
// 2x+1
const x = 10;

2 * x + 1;

console.log(2 * x + 1);

// operators (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

// arithmetic operators
// + - * / % **
console.log(2 + 2);
console.log(2 - 2);
console.log(2 * 2);
console.log(2 / 2);
console.log(2 % 2);
console.log(2 ** 2);
// ieee 754
console.log(0.1 + 0.2); // https://0.30000000000000004.com/

// concat operator
console.log(2 + '2'); //=> '22'
console.log(2 + Number('2')); //=> 4

// increment and decrement operators
let value = 10;

console.log(value++); //=> 10
console.log(++value); //=> 12

// relational operators
console.log(1 < 2);
console.log(1 <= 2);
console.log(1 > 2);
console.log(1 >= 2);

// equality operators
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality
// https://dorey.github.io/JavaScript-Equality-Table/
console.log(1 == 1); //=> true
console.log(1 === 1); //=> true
console.log(1 == '1'); //=> true
console.log(1 === '1'); //=> false

// binary logical operators
// ||, &&, !
console.log(true && false); //=> false
console.log(true || false); //=> true
console.log(!true); //=> false
console.log(!!10); //=> true Boolean(10)
console.log(!!0); //=> false

let a; // undefined
console.log(a || 0); //=> 0

a = 5;
console.log(a || 0); //=> 5

// Nullish coalescing operator (??)
let b; // undefined

console.log(b ?? 0); //=> 0

b = 5;

console.log(b ?? 0); //=> 5

// binary bitwise operators
// &, |, ^, ~, <<, >>, >>>

//   00000001 1
// & 00000001 1
// = 00000001 1
console.log(1 & 1); //=> 1

//   00000010 2
// & 00000001 1
// = 00000000 0
console.log(2 & 1); //=> 0

//   00000011 3
// & 00000001 1
// = 00000001 1
console.log(3 & 1); //=> 1

//   00000100 4
// & 00000001 1
// = 00000000 0
console.log(4 & 1); //=> 1

// coercion type
// https://exploringjs.com/deep-js/ch_type-coercion.html
console.log(1 + '1'); // 11
console.log(10 / 'a'); // NaN
// type error
const y = 10;
y(); // TypeError: x is not a function
