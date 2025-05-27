import { useState } from "react";
import { TokenInfo, TokenList } from "../types/types";
import Fuse, { IFuseOptions } from "fuse.js";
import { useGetTokenListQuery } from "../store/tokensApi/tokensApiSlice";

const fuseOptions: IFuseOptions<TokenInfo> = {
  threshold: 0.3,
  distance: 0,
  ignoreDiacritics: true,
  keys: ["symbol", "address", "chainId"],
};

export const useFilterTokensBySearch = () => {
  const [filteredTokens, setFilteredTokens] = useState<TokenList>([]);
  const [searching, setSearching] = useState<boolean>(false);

  const { data: tokens = [] } = useGetTokenListQuery("");

  const fuse = new Fuse(tokens, fuseOptions);

  const filterbySearch = async (term: string) => {
    console.log("Searching for:", term);
    setSearching(true);
    return new Promise<TokenList | []>((resolve) => {
      if (term.length < 1) {
        setFilteredTokens([]);
        resolve([]);
        setSearching(false);
        return;
      }
      const results = fuse.search(term).map((result) => result.item);
      setFilteredTokens(results);
      setSearching(false);
      resolve(results);
    });
  };

  return { searching, filteredTokens, filterbySearch };
};
