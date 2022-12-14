export const upperFirstLetter = (word) => {
  const splitted = word.split("");
  const first = splitted[0].toUpperCase();
  const rest = [...splitted];
  rest.splice(0, 1);
  const result = [first, ...rest].join("");
  return result;
};
