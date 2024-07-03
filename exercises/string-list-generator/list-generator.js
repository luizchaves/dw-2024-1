export function createList(number) {
  let list = `<ul>\n`;

  for (let n = 1; n <= number; n++) {
    list += `  <li>Item ${n}</li>\n`;
  }

  list += `</ul>`;

  return list;
}
