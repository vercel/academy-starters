// Strip everything but digits so "(207) 555-0147" and "207.555.0147" are the same customer.
export function normalizePhone(input: string) {
  return input.replace(/\D/g, "");
}

export function isValidPhone(input: string) {
  const digits = normalizePhone(input);
  return digits.length >= 10 && digits.length <= 15;
}
