export const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arrs) => acc + cur / arrs.length, 0);
