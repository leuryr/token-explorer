import { useState } from "react";
import { TokenInfo, TokenList } from "./types/types";
import { InputMode } from "./store/swap/types/swapTypes";
import { SwapButton } from "./SwapButton";
// import { SwapOptions } from "./SwapOptions";
import { SwapInput } from "./SwapInput";
import { SwapSubtext } from "./SwapSubtext";
import { TokenSelectorModal } from "./TokenSelectorModal";

interface SwapPanelProps {
  label: string;
  inputValue?: string;
  subtextValue?: string;
  selectedToken: TokenInfo | null;
  tokenList: TokenList;
  setInputAmount?: (value: string) => void;
  onChangeSelectedToken: (token: TokenInfo) => void;
  readOnly?: boolean;
  inputMode?: InputMode;
}

export const SwapPanel: React.FC<SwapPanelProps> = ({
  label,
  inputValue = "",
  subtextValue = "",
  selectedToken,
  tokenList,
  setInputAmount,
  onChangeSelectedToken,
  readOnly = false,
  inputMode,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex text-black flex-col justify-between items-center p-4 border rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-semibold self-start">{label}</h3>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start">
          <div className="flex text-2xl font-semibold">
            {inputMode === "usd" ? <label htmlFor={`${label}-amount`}>$</label> : null}
            <SwapInput
              amount={inputValue}
              onChangeAmount={
                label === "Source" ? setInputAmount : undefined
              }
              label={label}
              readOnly={readOnly}
            />
          </div>
          <SwapSubtext
            selectedToken={selectedToken}
            value={subtextValue}
          />
        </div>
        <div className="flex flex-col">
          <SwapButton
            icon={selectedToken?.logoURI || ""}
            selectedSymbol={selectedToken?.symbol}
            onClick={() => setShowOptions((prev) => !prev)}
          />
          {showOptions && (
            <TokenSelectorModal
              isOpen={showOptions}
              featuredTokens={tokenList}
              onSelect={onChangeSelectedToken}
              onClose={() => setShowOptions(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
