import { useState } from "react";
import { TokenInfo, TokenList } from "../types/types";
import { InputMode } from "../store/swap/types/swapTypes";
import { SwapButton } from "./SwapButton";
import { SwapInput } from "./SwapInput";
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
    <div className="w-full min-h-35 md:w-1/2 max-w-md flex text-black justify-between items-center px-5 py-3 border rounded-2xl bg-slate-50 shadow-sm">
      <div className="flex flex-col xs:flex-row justify-between items-center w-full">
        <div className="flex flex-col items-start gap-3">
          <h3 className="text-xl font-semibold self-start">{label}</h3>
          <div className="flex shrink text-3xl font-semibold">
            {inputMode === "usd" ? (
              <label htmlFor={`${label}-amount`}>$</label>
            ) : null}
            <SwapInput
              amount={inputValue}
              onChangeAmount={label === "Source" ? setInputAmount : undefined}
              label={label}
              readOnly={readOnly}
            />
          </div>
          <p className="text-base text-gray-500">{subtextValue || ""}</p>
        </div>
        <SwapButton
          icon={selectedToken?.logoURI || ""}
          selectedSymbol={selectedToken?.symbol}
          onClick={() => setShowOptions((prev) => !prev)}
        />
      </div>
      {showOptions && (
        <TokenSelectorModal
          isOpen={showOptions}
          featuredTokens={tokenList}
          onSelect={onChangeSelectedToken}
          onClose={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};
