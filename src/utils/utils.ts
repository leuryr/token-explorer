export const getUsdValue = (tokenAmount: string, unitPrice: number): string =>
  (parseFloat(tokenAmount) * unitPrice).toFixed(2);

export const getTokenValue = (usdValue: string, unitPrice: number): string => {
  const value = parseFloat(usdValue) / unitPrice;
  return value.toFixed(4);
};

export const isValueValid = (value: string): boolean => {
  const regex = /^\d+(\.\d{1,4})?$/;
  return regex.test(value);
};
