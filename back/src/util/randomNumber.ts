export const randomNumber = (minimo, maximo) => {
  return Math.floor(Math.random() * (maximo + 1 - minimo) + minimo);
};
