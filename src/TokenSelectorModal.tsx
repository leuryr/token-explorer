import { useEffect, useRef } from "react";
import { TokenInfo } from "./types/types";

interface Props {
  isOpen: boolean;
  tokens: TokenInfo[];
  onSelect: (token: TokenInfo) => void;
  onClose: () => void;
}

export const TokenSelectorModal: React.FC<Props> = ({
  isOpen,
  tokens,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleTokenSelect = (token: TokenInfo) => {
    onSelect(token);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-1 items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-80 max-h-[80vh] overflow-y-auto" ref={modalRef}>
        <h2 className="text-white text-lg mb-4">Select Token</h2>
        <ul>
          {tokens.map((token) => (
            <li
              key={token.address}
              className="flex items-center gap-3 p-2 hover:bg-zinc-800 cursor-pointer rounded"
              onClick={() => handleTokenSelect(token)}
            >
              <img
                src={token.logoURI}
                alt={token.symbol}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-white">{token.symbol}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-zinc-400 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};
