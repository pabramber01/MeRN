const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const objectsEqual = (a, b) => {
  return arraysEqual(Object.values(a), Object.values(b));
};

const numberFormatter = (n) =>
  new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(n);

export { arraysEqual, objectsEqual, numberFormatter };
