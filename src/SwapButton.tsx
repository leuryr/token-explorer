import React from "react";
import CaretDown from "./assets/icons/caret-down.svg?react";

interface SwapButtonProps {
  icon: string;
  selectedSymbol?: string;
  onClick: () => void;
}

export const SwapButton: React.FC<SwapButtonProps> = ({
  icon,
  selectedSymbol,
  onClick,
}) => {
  return (
    <button
      className="flex gap-2 cursor-pointer items-center bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition duration-200"
      onClick={onClick}
    >
      {icon && (
        <img
          src={icon}
          alt={selectedSymbol || "Token Icon"}
          className="w-5 h-5 rounded-full"
        />
      )}
      {selectedSymbol ? `${selectedSymbol}` : "Select Token"}
      <CaretDown className="w-4 h-4 fill-white" />
    </button>
  );
};
