import { useState, useEffect, useRef, useMemo } from "react";
import { TokenInfo } from "./types/types";
import { useFilterTokensBySearch } from "./hooks/useFilterTokensBySearch";
import { debouncePromise } from "./utils/utils";
import Xmark from "./assets/icons/x-mark.svg?react";

interface Props {
  isOpen: boolean;
  featuredTokens: TokenInfo[];
  onSelect: (token: TokenInfo) => void;
  onClose: () => void;
}

export const TokenSelectorModal: React.FC<Props> = ({
  isOpen,
  featuredTokens,
  onSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { filteredTokens, filterbySearch } =
    useFilterTokensBySearch();
  const [debouncedFilterbySearch, cancelSearch] = useMemo(
    () =>
      debouncePromise((term: string) => {
        console.log("Debounced search for:", term);
        return filterbySearch(term);
      }, 1500),
    [],
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
    <div className="fixed inset-0 bg-black/70 flex flex-1 items-center justify-center z-50 p-4">
      <div
        className="bg-neutral-500 dark:bg-zinc-900 p-6 rounded-2xl w-100 max-h-[80vh] overflow-y-auto"
        ref={modalRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl">Select Token</h2>
          <Xmark className="cursor-pointer w-5 h-5 fill-white" onClick={() => onClose()}/>
        </div>
        <input
          type="text"
          placeholder="Search more tokens..."
          value={searchTerm}
          className="w-full py-2 px-4 mb-4 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <ul className="flex overflow-x-auto">
          {featuredTokens.map((token) => (
            <li
              key={`${token.address} - ${token.chainId}`}
              className="flex flex-col gap-2 justify-center p-2 items-center hover:bg-zinc-800 cursor-pointer rounded min-w-15"
              onClick={() => handleTokenSelect(token)}
            >
              <img
                src={token.logoURI}
                alt={token.symbol}
                className="w-5 h-5 rounded-full"
              />
              <p className="text-white">{`${token.symbol}`}</p>
            </li>
          ))}
        </ul>
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
      </div>
    </div>
  );
};
