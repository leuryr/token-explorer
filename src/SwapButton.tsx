import React from "react";
import AngleDown from "./assets/icons/angle-down.svg?react";

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
      className="min-w-[132px] flex shrink-0 gap-2 cursor-pointer items-center bg-zinc-800 text-white font-semibold py-2.5 px-4 rounded-full shadow-md hover:bg-zinc-500 transition duration-200"
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
      <AngleDown className="w-4 h-4 fill-white" />
    </button>
  );
};
