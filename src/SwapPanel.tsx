import { useState, useEffect } from "react";
import { TokenInfo, TokenList } from "./types/types";
import { SwapButton } from "./SwapButton";
import { SwapOptions } from "./SwapOptions";
import { useTokenDetails } from "./hooks/hooks";
import { getTokenValue } from "./utils/utils";

interface SwapPanelProps {
  label: string;
  amount?: string;
  setAmount?: (value: string) => void;
  selectedToken: TokenInfo | null;
  tokenList: TokenList;
  onChangeAmount?: (value: string) => void;
  onChangeSelectedToken: (token: TokenInfo) => void;
  readOnly?: boolean;
}

export const SwapPanel: React.FC<SwapPanelProps> = ({
  label,
  amount = "",
  setAmount = () => {},
  selectedToken,
  tokenList,
  onChangeAmount,
  onChangeSelectedToken,
  readOnly = false,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [usdValue, setUsdValue] = useState(0);
  const [tokenValue, setTokenValue] = useState<string | null>(null);
  const { price, decimals, isLoading } = useTokenDetails(selectedToken);

  useEffect(() => {
    if (selectedToken && price && decimals && amount) {
      setTokenValue(getTokenValue(amount, price));
    }
  }, [amount, price, decimals, selectedToken]);

console.log(tokenValue);
  return (
    <div className="flex text-black flex-col justify-between items-center p-4 border rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-semibold self-start">{label}</h3>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start">
          <div className="flex">
            <label
              htmlFor="dollar-amount"
              className="text-2xl font-semibold"
            >
              $
            </label>
            <input
              id="dollar-amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              className="w-full text-2xl font-semibold border-none outline-none"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                setAmount(value);
                if (onChangeAmount) {
                  onChangeAmount(value);
                }
              }}
              readOnly={readOnly}
            />
          </div>
          <p className="text-sm text-gray-500">
            {selectedToken && (tokenValue || 0)} {selectedToken?.symbol || ""}
          </p>
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
