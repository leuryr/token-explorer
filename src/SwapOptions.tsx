import React from "react";
import { TokenInfo, TokenList } from "./types/types";

interface SwapOptionsProps {
  tokenList: TokenList;
  onClick: (token:TokenInfo) => void;
}

export const SwapOptions: React.FC<SwapOptionsProps> = ({
  tokenList,
  onClick,
}) => {
  return (
    <ul className="absolute z-1 bg-white shadow-lg rounded-lg p-4">
      {tokenList.map((token) => (
        <li className="cursor-pointer" key={token.symbol} value={token.symbol} onClick={() => onClick(token)} >
          {token.symbol}
        </li>
      ))}
    </ul>
  );
};
