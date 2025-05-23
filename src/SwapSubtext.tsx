import { TokenInfo } from "./types/types";

interface SwapSubtextProps {
  selectedToken?: TokenInfo | null;
  value?: string | undefined;
  modeUsd?: boolean;
}

export const SwapSubtext: React.FC<SwapSubtextProps> = ({
  selectedToken,
  value,
  modeUsd,
}) => {
  return (
    <p className="text-sm text-gray-500">
      {!modeUsd && value && selectedToken ? "$" : ""}
      {selectedToken && (value || 0)}{" "}
      {modeUsd && (selectedToken?.symbol || "")}
    </p>
  );
};
