export const getUsdValue = (tokenAmount: number, unitPrice: number): number =>
  (tokenAmount * unitPrice);

export const getTokenValue = (usdValue: number, unitPrice: number): string => {
  const value = usdValue / unitPrice;
  return value.toFixed(4);
};

export const cleanInput = (value: string): string => {
  return value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
};
