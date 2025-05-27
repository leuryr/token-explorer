import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import {
  setSourceToken,
  setTargetToken,
  setSourceValue,
  setTargetValue,
  setSourceSubtext,
  setTargetSubtext,
} from "./store/swap/swapSlice";
import { SwapPanel } from "./SwapPanel";
import "./App.css";
import { tokenList } from "./tokenList";
import { useTokenDetails } from "./hooks/useTokenDetails";
import { getTokenValue, getUsdValue } from "./utils/utils";

function App() {
  const dispatch = useDispatch();
  const source = useSelector((state: RootState) => state.swap.source);
  const target = useSelector((state: RootState) => state.swap.target);

  const sourcePrice = useTokenDetails(source.token);
  const targetPrice = useTokenDetails(target.token);

  useEffect(() => {
  if (!source.token || !sourcePrice.unitPrice) return;

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

  if (!target.token || !targetPrice.unitPrice) return;

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
    <div className="h-full gap-10 flex flex-col items-center justify-start bg-white dark:bg-black">
      <header className="flex flex-col items-center justify-end min-h-[20vh] text-center">
        <h1 className="text-4xl">Token Price Explorer</h1>
        <p>
          Use the interface below to explore the price of different tokens.
          <br />
          Select a token and enter the amount in USD to see the equivalent value
          in the selected token.
        </p>
      </header>
      <main className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-[90vw] mx-auto">
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
    </div>
  );
}

export default App;
