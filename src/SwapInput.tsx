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
}) => (
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
        onChangeAmount(value);
      }
    }}
    readOnly={readOnly}
  />
);
