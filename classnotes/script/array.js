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

// iteration
for (let flag = 0; flag < numbers.length; flag++) {
  // console.log(numbers[flag]);
}

// values of numbers

// keys of numbers

// entries

// Object Array

// Property: length

// Mutator: push(), unshift(), pop(), shift(), reverse(), sort(), splice()

// Accessor: includes(), join(), slice()

// Iteration: forEach(), map(), filter(), reduce(), every(), some()
