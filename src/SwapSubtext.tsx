import { TokenInfo } from "./types/types";

interface SwapSubtextProps {
  selectedToken?: TokenInfo | null;
  value?: string | undefined;
  modeUsd?: boolean;
}

export const SwapSubtext: React.FC<SwapSubtextProps> = ({
  value,
}) => {
  return (
    <p className="text-sm text-gray-500">
      {value || ""}
    </p>
  );
};
