export const getUsdValue = (tokenAmount: number, unitPrice: number): number =>
  (tokenAmount * unitPrice);

export const getTokenValue = (usdValue: number, unitPrice: number): string => {
  const value = usdValue / unitPrice;
  return value.toFixed(4);
};

export const cleanInput = (value: string): string => {
  return value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
};

export function debouncePromise<R>( 
  fn: (input: string) => Promise<R>,
  delay: number
): [ (input: string) => Promise<R>, () => void ] {
  let timeoutId: NodeJS.Timeout | undefined;

  const debouncedFn = async (input: string): Promise<R> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        timeoutId = undefined;
        try {
          const result = await fn(input);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };

  const cancel = () => clearTimeout(timeoutId);
  return [debouncedFn, cancel]; 
}