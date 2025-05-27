export interface TokenInfo {
  address: string;
  decimals: number;
  name: string;
  logoURI: string;
  chainId: number;
  symbol: string;
}

export type TokenList = TokenInfo[];