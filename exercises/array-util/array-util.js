export function min(array) {
  let minimum = array.shift();

  for (const value of array) {
    if (value < minimum) {
      minimum = value;
    }
  }

  return minimum;
}

export function max(array) {
  return Math.max(...array);
}

export function range(length, last, step) {
  // TODO
}

export function zip(...arrays) {
  // TODO
}

export function uniq(array) {
  // TODO
}

export function sortNum(array) {
  // TODO
}
