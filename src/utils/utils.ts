export const getUsdValue = (tokenAmount: string, unitPrice: number): string =>
  (parseFloat(tokenAmount) * unitPrice).toFixed(2);

export const getTokenValue = (usdValue: string, unitPrice: number): string => {
  const value = parseFloat(usdValue) / unitPrice;
  return value.toFixed(4);
};

export const cleanInput = (value: string): string => {
  return value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
};
