export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})?(\d{2})?(\d{3})?(\d{2})?(\d{2})/);
  if (match) {
    const intlCode = match[1] ? `+${match[1]}` : "";
    return [
      intlCode,
      "(",
      match[2],
      ")",
      match[3],
      "-",
      match[4],
      "-",
      match[5],
    ].join("");
  }
  return null;
};
