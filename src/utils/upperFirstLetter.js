export const upperFirstLetter = (word) => {
  const preWord = word.toUpperCase();
  const splitted = preWord.split("");
  const first = splitted[0];
  const rest = [...splitted];
  rest.splice(0, 1);
  const result = [first, ...rest].join("");
  return result;
};
