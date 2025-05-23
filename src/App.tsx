import { useState } from "react";
import { SwapPanel } from "./SwapPanel";
import "./App.css";
import { TokenInfo, TokenList } from "./types/types";
import { useTokenDetails } from "./hooks/hooks";
import { getTokenValue, getUsdValue } from "./utils/utils";

const tokenList: TokenList = [
  { symbol: "USDC", chainId: "1" },
  { symbol: "USDT", chainId: "137" },
  { symbol: "ETH", chainId: "8453" },
  { symbol: "WBTC", chainId: "1" },
];

function App() {
  const [amount, setAmount] = useState("");
  const [sourceModeUsd, setSourceModeUsd] = useState(true);
  const [sourceToken, setSourceToken] = useState<TokenInfo | null>(null);
  const [targetToken, setTargetToken] = useState<TokenInfo | null>(null);
  const { unitPrice: sourceUnitPrice } = useTokenDetails(sourceToken);
  const { unitPrice: targetUnitPrice } = useTokenDetails(targetToken);

  let derivedSourceAmount = "";
  if (sourceToken && sourceUnitPrice && amount) {
    if (sourceModeUsd) {
      derivedSourceAmount = getTokenValue(amount, sourceUnitPrice);
    } else {
      derivedSourceAmount = getUsdValue(amount, sourceUnitPrice);
    }
  }

  let derivedTargetAmount = "";
  if (targetToken && targetUnitPrice && amount) {
    if (sourceModeUsd) {
      derivedTargetAmount = getTokenValue(amount, targetUnitPrice);
    } else {
      derivedTargetAmount = getUsdValue(derivedSourceAmount, targetUnitPrice);
    }
  }

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
          upstreamAmount={amount}
          derivedAmount={derivedSourceAmount}
          selectedToken={sourceToken}
          tokenList={tokenList.filter(
            (token) =>
              token.symbol !== sourceToken?.symbol &&
              token.symbol !== targetToken?.symbol,
          )}
          setUpstreamAmount={(value) => setAmount(value)}
          onChangeSelectedToken={(token) => {
            setSourceToken(token);
          }}
          modeUsd={sourceModeUsd}
        />
        <SwapPanel
          label="Target"
          upstreamAmount={amount}
          derivedAmount={derivedTargetAmount}
          selectedToken={targetToken}
          tokenList={tokenList.filter(
            (token) =>
              token.symbol !== sourceToken?.symbol &&
              token.symbol !== targetToken?.symbol,
          )}
          onChangeSelectedToken={(token) => {
            setTargetToken(token);
          }}
          readOnly={true}
          modeUsd={!sourceModeUsd}
        />
      </main>
    </>
  );
}

export default App;
