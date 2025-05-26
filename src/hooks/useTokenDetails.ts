import { useState, useEffect } from "react";
import { TokenInfo } from "../types/types";
import {
  getAssetPriceInfo,
  getAssetErc20ByChainAndSymbol,
} from "@funkit/api-base";

export const useTokenDetails = (tokenInfo: TokenInfo | null) => {
  const [unitPrice, setUnitPrice] = useState<number | null>(null);
  const [decimals, setDecimals] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tokenInfo) {
      setUnitPrice(null);
      setError(null);
      setIsLoading(false);
      return;
    }
    const fetchPrice = async () => {
      try {
        setIsLoading(true);
        const tokenData = await getAssetErc20ByChainAndSymbol({
          ...tokenInfo,
          apiKey: import.meta.env.VITE_FUNKIT_API_KEY,
        });
        setDecimals(tokenData.decimals);
        const priceData = await getAssetPriceInfo({
          chainId: tokenData.chain,
          assetTokenAddress: tokenData.address,
          apiKey: import.meta.env.VITE_FUNKIT_API_KEY,
        });
        setUnitPrice(priceData.unitPrice);
        setError(null);
      } catch (error) {
        setError(`Failed to fetch price data: ${error}`);
        console.error("Error fetching price:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrice();
  }, [tokenInfo]);

  return { unitPrice, decimals, isLoading };
};
