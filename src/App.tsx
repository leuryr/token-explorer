import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import {
  setSourceToken,
  setTargetToken,
  setSourceValue,
  setTargetValue,
  setSourceInputMode,
  setTargetInputMode,
  setSourceSubtext,
  setTargetSubtext,
} from "./store/swap/swapSlice";
import { SwapPanel } from "./SwapPanel";
import "./App.css";
import { TokenList } from "./types/types";
import { useTokenDetails } from "./hooks/hooks";
import { getTokenValue, getUsdValue } from "./utils/utils";

const tokenList: TokenList = [
  { symbol: "USDC", chainId: "1" },
  { symbol: "USDT", chainId: "137" },
  { symbol: "ETH", chainId: "8453" },
  { symbol: "WBTC", chainId: "1" },
];

function App() {
  const dispatch = useDispatch();
  const source = useSelector((state: RootState) => state.swap.source);
  const target = useSelector((state: RootState) => state.swap.target);

  const sourcePrice = useTokenDetails(source.token);
  const targetPrice = useTokenDetails(target.token);

  useEffect(() => {
    if (
      !source.token ||
      !target.token ||
      !sourcePrice.unitPrice ||
      !targetPrice.unitPrice
    )
      return;

    let usdAmount: number;
    if (source.inputMode === "token") {
      usdAmount = getUsdValue(
        parseFloat(source.inputValue || "0"),
        sourcePrice.unitPrice,
      );
      dispatch(setSourceSubtext(`$${usdAmount.toFixed(2)}`));
    } else {
      usdAmount = parseFloat(source.inputValue || "0");
      dispatch(
        setSourceSubtext(
          `${getTokenValue(usdAmount, sourcePrice.unitPrice)} ${source.token.symbol}`,
        ),
      );
    }

    if (target.inputMode === "token") {
      const targetAmount = usdAmount / targetPrice.unitPrice;
      dispatch(
        setTargetValue(isNaN(targetAmount) ? "" : targetAmount.toFixed(6)),
      );
      dispatch(
        setTargetSubtext(
          `$${(targetAmount * targetPrice.unitPrice).toFixed(2)}`,
        ),
      );
    } else {
      dispatch(setTargetValue(isNaN(usdAmount) ? "" : usdAmount.toFixed(2)));
      dispatch(
        setTargetSubtext(
          `${getTokenValue(usdAmount, targetPrice.unitPrice)} ${target.token.symbol}`,
        ),
      );
    }
  }, [
    source.inputValue,
    source.inputMode,
    target.inputMode,
    source.token,
    target.token,
    sourcePrice.unitPrice,
    targetPrice.unitPrice,
  ]);

  return (
    <>
      <header className="flex flex-col items-center justify-end min-h-[20vh]">
        <h1 className="text-2xl">Token Price Explorer</h1>
        <p>
          Use the interface below to explore the price of different tokens.
          <br />
          Select a token and enter the amount in USD to see the equivalent value
          in the selected token.
        </p>
      </header>
      <main className="flex items-start justify-around h-full">
        <SwapPanel
          label="Source"
          inputValue={source.inputValue}
          subtextValue={source.subtext}
          selectedToken={source.token}
          tokenList={tokenList.filter(
            (token) =>
              token.symbol !== source.token?.symbol &&
              token.symbol !== target.token?.symbol,
          )}
          setInputAmount={(value) => dispatch(setSourceValue(value))}
          onChangeSelectedToken={(token) => {
            dispatch(setSourceToken(token));
          }}
          inputMode={source.inputMode}
        />
        <SwapPanel
          label="Target"
          inputValue={target.inputValue}
          subtextValue={target.subtext}
          selectedToken={target.token}
          tokenList={tokenList.filter(
            (token) =>
              token.symbol !== source.token?.symbol &&
              token.symbol !== target.token?.symbol,
          )}
          setInputAmount={(value) => dispatch(setTargetValue(value))}
          onChangeSelectedToken={(token) => {
            dispatch(setTargetToken(token));
          }}
          readOnly={true}
          inputMode={target.inputMode}
        />
      </main>
    </>
  );
}

export default App;
