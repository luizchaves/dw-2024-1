// boolean
console.log(true);
console.log(false);
console.log(typeof false); //=> boolean

// Nullish null, undefined
// undefined
console.log(undefined);

// null
console.log(null);

// number
console.log(typeof 15); //=> number
console.log(15);
console.log(0b1111);
console.log(0o17);
console.log(0xf);

console.log(typeof 15.15); //=> number
console.log(15.15);
console.log(1515e-2); //=> 15.15

console.log(NaN);
console.log((-2) ** (1 / 2)); //=> NaN

console.log(Infinity);

// BigInt https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
console.log(Number.MAX_SAFE_INTEGER); //=> 9007199254740991
console.log(typeof 9007199254740991); // MaxSafeInteger
console.log(typeof 9007199254740992n);

// string
console.log('Hello');
// console.log("Hello");
console.log(`Hello`);

// console.log('Hello' +
// 'IFPB');
console.log(`Hello
IFPB`);

// Array
console.log([1, 2, 3]);
console.log([1, 'Alice', true, 'alice@email.com']);

// JSON
console.log({
  id: 1,
  name: 'Alice',
  status: true,
  email: 'alice@email.com',
});

// Map, Set...
