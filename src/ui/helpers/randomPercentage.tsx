export const randomPercentage = (from: number, to: number) => {
  const randomNum = Math.random() * (to - from) + from;
  const randomPercent = randomNum.toString() + '%';

  return randomPercent;
};
