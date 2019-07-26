export const formatNumber = (num: number, digitCount: number) =>
  (Math.round(num * 10 ** digitCount) / 10 ** digitCount).toFixed(digitCount);
