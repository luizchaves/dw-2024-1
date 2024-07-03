// Defining classes - Constructor, property, methods, static, private, inheritance
// Host
// hostname: string
// address: string
// mask: string
class Host {
  static NEXT_ID = 1;

  constructor(hostname, address, mask) {
    this.id = Host.NEXT_ID++;
    this.hostname = hostname;
    this.address = address;
    this.mask = mask;
  }

  toString() {
    return `#${this.id} ${this.hostname} (${this.address}/${this.mask})`;
  }
}

const hostA = new Host('DSK01LB01-JP', '192.168.0.10', '255.255.255.0');

console.log(hostA);
console.log(hostA.address);
console.log(hostA.toString());

class HostSet {
  #hosts;

  constructor() {
    this.#hosts = [];
  }

  // get hosts() {
  //   return this.#hosts;
  // }

  // set hosts(hosts) {
  //   return (this.#hosts = hosts);
  // }

  add(host) {
    this.#hosts.push(host);
  }
}

const hostSet = new HostSet();
// console.log(hostSet.hosts);
hostSet.add(hostA);

class IFPBHost extends Host {
  constructor(hostname, address, mask, local) {
    super(hostname, address, mask);
    this.local = local;
  }
}

const hostB = new IFPBHost(
  'DSK01LB01-JP',
  '192.168.0.20',
  '255.255.255.0',
  'Lab 01'
);

console.log(hostB);
console.table(hostB);

// JSON - JavaScript Object Notation

const hostC = {
  address: '192.168.0.30',
  mask: '255.255.255.0',
};

console.table(hostC);

// // Property Shorthand
// const address = '192.168.0.40';
// const mask = '255.255.255.0';

// const hostD = {
//   address: address,
//   mask: mask,
// };

// console.table(hostD);

// const hostE = { address, mask };

// console.table(hostE);

// // Spread properties

// const hostF = { ...hostE, id: 1 };

// console.table({ ...hostF, address: '192.168.0.40' });

// // Property (variable)
// const key = 'local';
// const place = 'Lab 01';

// const hostG = {
//   ...hostF,
//   [key]: place,
// };

// // Reference vs value
// let hostnameA = 'DSK01LB01-JP';

// let hostnameB = hostnameA;

// hostnameB = 'DSK02LB01-JP';

// console.log(hostnameA); //=> 'DSK01LB01-JP'

// let hostnameC = {
//   desktop: 1,
//   lab: 1,
// };

// let hostnameD = hostnameC;

// hostnameD.desktop = 2;

// console.log(hostnameC);

// let hostnameE = { ...hostnameC };

// hostnameE.desktop = 3;

// console.log(hostnameC);

// // JSON - JSON.stringify, JSON.parse
// const string = JSON.stringify(hostnameC);

// console.log(string);

// const hostString = '{"desktop":2,"lab":1}';

// console.log(JSON.parse(hostString));

// // Object - Object.keys, Object.values, Object.entries

// // Loop - for..in
// const host = {
//   address: '192.168.0.30',
//   mask: '255.255.255.0',
// };

// for (const key in host) {
//   console.log(`${key} ${host[key]}`);
// }

// for (const key of Object.keys(host)) {
//   console.log(`${key} ${host[key]}`);
// }

// for (const value of Object.values(host)) {
//   console.log(value);
// }

// for (const [key, value] of Object.entries(host)) {
//   console.log(`${key} ${value}`);
// }

// const hosts = [
//   {
//     address: '192.168.0.30',
//     mask: '255.255.255.0',
//   },
//   {
//     address: '192.168.0.60',
//     mask: '255.255.255.0',
//   },
// ];

// for (const host of hosts) {
//   console.log(host.address);
// }

// hosts.map((host) => host.address);
