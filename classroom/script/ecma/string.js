// String ', ", `
console.log('DSK01LB65-JP');
// console.log("DSK01LB65-JP");
console.log(`DSK01LB65-JP`);

// Concat
// IP: 192.168.0.1
// Mask: 255.255.255.0
const address = '192.168.0.1';
const mask = '255.255.255.0';

// IP: 192.168.0.1, Mask: 255.255.255.0
console.log('IP: ' + address + '\nMask: ' + mask);

// Template literals / Template strings
// multi-line strings
// string interpolation
console.log(`IP: address \nMask: mask`);
console.log(`IP: ${address} \nMask: ${mask}`);
console.log(`IP: ${address}
Mask: ${mask}`);

// Array of characters (immutable)
const hostname = 'DSK01LB65-JP';

console.log(hostname[0]); // D

hostname[0] = 'd';

console.log(hostname); // DSK01LB65-JP

// Object String

// String.length
console.log(hostname); // DSK01LB65-JP
console.log(hostname.length); // 12

// String.split / Array.join
// 192.168.0.1, 192.168.0.2, 192.168.0.3
let hosts = '192.168.0.1, 192.168.0.2, 192.168.0.3';
console.log(hosts.split(', '));

// IP: 192.168.0.1
// IP: 192.168.0.3
// IP: 192.168.0.2
for (const host of hosts.split(', ')) {
  console.log(`IP: ${host}`);
}

// String.toLowerCase
console.log(hostname); // DSK01LB65-JP
console.log(hostname.toLowerCase()); // dsk01lb65-jp

// String.includes
console.log(hostname); // DSK01LB65-JP
console.log(hostname.includes('JP')); // true

// String.match
// /\d+\.\d+\.\d+\.\d+/
// 192.168.0.1, 192.168.0.2, 192.168.0.3
console.log(hosts);

console.log(hosts.match(/\d+\.\d+\.\d+\.\d+/)); // ['192.168.0.1', index: 0, input: '192.168.0.1, 192.168.0.2, 192.168.0.3', groups: undefined]

const ipPattern = /\d+\.\d+\.\d+\.\d+/g;
for (const host of hosts.match(ipPattern)) {
  console.log(`IP: ${host}`);
}

// String.padStart
// DSK01LB65-JP => DSK001LB065-JP
const desktop = 1;
const lab = 65;
const campus = 'jp';

const padNumber = (number) => String(number).padStart(3, '0');

console.log(
  `DSK${padNumber(desktop)}LB${padNumber(lab)}-${campus.toUpperCase()}`
);
