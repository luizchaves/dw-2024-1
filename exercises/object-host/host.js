// Host	Address	Mask
// PC 1	192.168.0.1	255.255.255.0
// Server 1	172.16.0.1	255.255.0.0
// Server 2	10.0.0.1	255.0.0.0

let hosts = [
  ['PC 1', '192.168.0.1', '255.255.255.0'],
  ['Server 1', '172.16.0.1', '255.255.0.0'],
  ['Server 2', '10.0.0.1', '255.0.0.0'],
];

console.log(hosts[1][1]);

hosts = [
  {
    hostname: 'PC 1',
    address: '192.168.0.1',
    mask: '255.255.255.0',
  },
  {
    hostname: 'Server 1',
    address: '172.16.0.1',
    mask: '255.255.0.0',
  },
  {
    hostname: 'Server 2',
    address: '10.0.0.1',
    mask: '255.0.0.0',
  },
];
console.log(hosts[1].address);
