import { useState, useEffect, useRef, useMemo } from "react";
import { TokenInfo } from "./types/types";
import { useFilterTokensBySearch } from "./hooks/useFilterTokensBySearch";
import { debouncePromise } from "./utils/utils";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { searching, filteredTokens, filterbySearch } = useFilterTokensBySearch();
  const [debouncedFilterbySearch, cancelSearch] = useMemo(
    () => debouncePromise((term: string) => 
      {
        console.log("Debounced search for:", term);
        return filterbySearch(term)}, 1500
      ),
    []
  );
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

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      cancelSearch();
      filterbySearch("");
    } else {
      debouncedFilterbySearch(term);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-1 items-center justify-center z-50">
      <div
        className="bg-zinc-900 p-6 rounded-xl w-80 max-h-[80vh] overflow-y-auto"
        ref={modalRef}
      >
        <h2 className="text-white text-lg mb-4">Select Token</h2>
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchTerm}
          className="w-full p-2 mb-4 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <ul>
          {filteredTokens.map((token) => (
            <li
              key={`${token.address} - ${token.chainId}`}
              className="flex items-center gap-3 p-2 hover:bg-zinc-800 cursor-pointer rounded"
              onClick={() => handleTokenSelect(token)}
            >
              <img
                src={token.logoURI}
                alt={token.symbol}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-white">{`${token.symbol} @chainId: ${token.chainId}`}</span>
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
