import { useState } from "react";
import { TokenInfo, TokenList } from "./types/types";
import { SwapButton } from "./SwapButton";
import { SwapOptions } from "./SwapOptions";
import { SwapInput } from "./SwapInput";
import { SwapSubtext } from "./SwapSubtext";

interface SwapPanelProps {
  label: string;
  upstreamAmount?: string;
  derivedAmount?: string;
  selectedToken: TokenInfo | null;
  tokenList: TokenList;
  setUpstreamAmount?: (value: string) => void;
  onChangeSelectedToken: (token: TokenInfo) => void;
  readOnly?: boolean;
  modeUsd?: boolean;
}

export const SwapPanel: React.FC<SwapPanelProps> = ({
  label,
  upstreamAmount = "",
  derivedAmount = "",
  selectedToken,
  tokenList,
  setUpstreamAmount,
  onChangeSelectedToken,
  readOnly = false,
  modeUsd,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex text-black flex-col justify-between items-center p-4 border rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-semibold self-start">{label}</h3>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start">
          <div className="flex text-2xl font-semibold">
            {modeUsd ? <label htmlFor={`${label}-amount`}>$</label> : null}
            <SwapInput
              amount={label === "Source" ? upstreamAmount : derivedAmount}
              onChangeAmount={
                label === "Source" ? setUpstreamAmount : undefined
              }
              label={label}
              readOnly={readOnly}
            />
          </div>
          <SwapSubtext
            selectedToken={selectedToken}
            value={label === "Source" ? derivedAmount : upstreamAmount}
            modeUsd={modeUsd}
          />
        </div>
        <div className="flex flex-col">
          <SwapButton
            selectedSymbol={selectedToken?.symbol}
            onClick={() => setShowOptions((prev) => !prev)}
          />
          {showOptions && (
            <SwapOptions
              tokenList={tokenList}
              onClick={onChangeSelectedToken}
            />
          )}
        </div>
      </div>
    </div>
  );
};
