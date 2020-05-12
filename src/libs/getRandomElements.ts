export const getRandomElements = (arr: any[], n: number) => {
  const result = [];
  let len = arr.length;
  const taken = new Array(len);

  if (n > len) {
    throw new RangeError(
      "getRandomElements: more elements taken than available"
    );
  }

  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * len);

    result[i] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
};
