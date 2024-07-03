// create array with values
const numbers = [1, 2, 3];

console.log(numbers); // [1, 2, 3]

console.log(numbers[0]); // 1
console.log(numbers[2]); // 3
console.log(numbers[3]); // undefined
console.log(numbers.at(-1)); // 3

// adding/changing values
numbers[3] = 5;
console.log(numbers); // [1, 2, 3, 5]

numbers[3] = 4;
console.log(numbers); // [1, 2, 3, 4]

numbers.push(5);
console.log(numbers); // [1, 2, 3, 4, 5]

numbers.unshift(0);
console.log(numbers); // [0, 1, 2, 3, 4, 5]

// multiple types
const person = [
  123,
  'Alice',
  true,
  ['alice@email.com', 'alice@otheremail.com'],
];

console.log(person[1]); // Alice
console.log(person[3][1]); // alice@otheremail.com

// destructuring arrays
// const id = person[0];
// const name = person[1];
const [id, name] = person;
console.log(name);
const [, , status, [, email]] = person;
console.log(email);

// spread operator
console.log(Math.min(1, 2, 3));
console.log(Math.min([1, 2, 3]));
console.log(Math.min(...[1, 2, 3]));

// clone array
const x = [1, 2, 3];
console.log(x);

const y = x;
y.pop();
console.log(x); // [1, 2]

const z = [...x];
z.pop();
console.log(x);
console.log(z);

const student = [...person, ['dw', 'asa']];
console.log(JSON.stringify(student));

// iteration
for (let index = 0; index < numbers.length; index++) {
  console.log(numbers[index]);
}

// values
const values = [1, 10, 100];
console.log(values);

for (const value of values) {
  console.log(value);
}

// keys of values
for (const index in values) {
  console.log(index, values[index]);
}

// entries
for (const [index, value] of values.entries()) {
  console.log(index, value);
}

// Object Array

// Property: length
console.log(values); // [1, 10, 100]
console.log(values.length); // 3

// Mutator: push(), unshift(), pop(), shift(), reverse(), sort(), splice()
console.log(values); // [1, 10, 100]

values.push(5);
console.log(values); // [1, 10, 100, 5]

values.unshift(50);
console.log(values); // [50, 1, 10, 100, 5]

values.pop();
console.log(values); // [50, 1, 10, 100]

values.shift();
console.log(values); // [1, 10, 100]

values.reverse();
console.log(values); // [100, 10, 1]

values.unshift(2);
console.log(values); // [2, 100, 10, 1]
values.sort();
console.log(values); // [1, 10, 100, 2]
values.sort((a, b) => a - b);
console.log(values); // [1, 2, 10, 100]
const names = ['Bob', 'alice', 'Charlie'];
console.log(names.sort()); // ['Bob', 'Charlie', 'alice']
console.log(names.sort((a, b) => a.localeCompare(b))); // ['alice', 'Bob', 'Charlie']

console.log(values); // [1, 2, 10, 100]
values.splice(1, 1);
console.log(values); // [1, 10, 100]

// Accessor: includes(), join(), slice(), toReversed(), toSorted(), toSpliced()
console.log(values); // [1, 10, 100]
console.log(values.includes(1)); // true
console.log(values.includes(2)); // false

console.log(values); // [1, 10, 100]
console.log(values.slice(0, 2)); // [1, 10]
console.log(values); // [1, 10, 100]

console.log(values.join()); // '1,10,100'
console.log(values.join('')); // '110100'
console.log(values.join(' ')); // '1 10 100'

// Iteration: forEach(), map(), filter(), reduce(), every(), some()
console.log(values); // [1, 10, 100]

console.log(values.map((x) => x + 1)); // [2, 11, 101]

console.log(values.filter((x) => x % 2 === 0)); // [10, 100]

console.log(values.some((x) => x % 2 === 0)); // true

console.log(values.every((x) => x % 2 === 0)); // false

console.log(values.reduce((acc, value) => acc + value, 0)); // 111
// [1, 10, 100]
// f(acc, value) => acc + value
// acc | value | f(acc, value)
//   0 |     1 |   1
//   1 |    10 |  11
//  11 |   100 | 111

console.log(values.reduce((acc, value) => acc + value)); // 111
// [1, 10, 100]
// f(acc, value) => acc + value
// acc | value | f(acc, value)
//   1 |    10 |  11
//  11 |   100 | 111
