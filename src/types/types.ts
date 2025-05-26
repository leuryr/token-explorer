export interface TokenInfo {
  address: string;
  decimals: number;
  name: string;
  logoURI: string;
  chainId: string;
  symbol: string;
}

export type TokenList = TokenInfo[];