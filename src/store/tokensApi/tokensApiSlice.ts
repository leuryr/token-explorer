import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TokenInfo } from "../../types/types";

interface TokenMetadata extends TokenInfo {
  extensions: {};
}

export const tokensApi = createApi({
  reducerPath: "tokensApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ipfs.io/ipns/tokens.uniswap.org",
  }),
  endpoints: (builder) => ({
    getTokenList: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (response: { tokens: TokenMetadata[] }) =>
        response.tokens.map(
          ({ extensions, ...keptValues }: TokenMetadata): TokenInfo => {
            return keptValues;
          },
        ),
      // Cache for 2 weeks (overkill, but this seems about how much the data is updated accoring to tokenlists.org)
      keepUnusedDataFor: 60 * 60 * 24 * 14,
    }),
  }),
});

export const { useGetTokenListQuery } = tokensApi;
