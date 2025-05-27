import { cleanInput } from "../utils/utils";

interface SwapInputProps {
  amount?: string;
  onChangeAmount?: (value: string) => void;
  readOnly: boolean;
  label: string;
}

export const SwapInput: React.FC<SwapInputProps> = ({
  amount = "",
  onChangeAmount,
  readOnly = false,
  label,
}) => {
  return (
    <input
      id={`${label}-amount`}
      type="text"
      inputMode="decimal"
      placeholder="0"
      className="w-full border-none outline-none"
      value={amount}
      onChange={(e) => {
        const value = e.target.value;
        if (onChangeAmount) {
          const cleanedValue = cleanInput(value);
          onChangeAmount(cleanedValue);
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        const pastedValue = e.clipboardData.getData("text");
        if (onChangeAmount) {
          const cleanedValue = cleanInput(pastedValue);
          onChangeAmount(cleanedValue);
        }
      }}
      readOnly={readOnly}
    />
  );
};
