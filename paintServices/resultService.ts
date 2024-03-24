export function checkResultIterable(result: any) {
  // Check if the result is defined and iterable
  if (result && Symbol.iterator in Object(result)) {
    return result;
  } else {
    return [];
  }
}
