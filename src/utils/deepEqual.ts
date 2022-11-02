export function deepEqual(a: Indexed, b: Indexed): boolean {
  if (a === b) {
    return true;
  }

  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  const aObjectKeys = Object.keys(a);
  const bObjectKeys = Object.keys(b);

  if (aObjectKeys.length !== bObjectKeys.length) {
    return false;
  }

  return aObjectKeys.reduce((acc: boolean, key) => {
    if (!acc) return false;

    if (!bObjectKeys.includes(key)) {
      acc = false;
      return acc;
    }

    acc = deepEqual(a[key] as Indexed, b[key] as Indexed);
    return acc;
  }, true);
}
