import React, { useState, useRef, useEffect } from "react";
import Highlighter from "react-highlight-words";
import "./select-dropdown.css";

interface Option {
  label: string;
  value: string;
}

export interface SelectDropdownProps {
  id: string;
  withSearch?: boolean;
  options: Option[];
  multiple?: boolean;
  optionalLabel?: string;
  onChange?: (value: string[]) => void;
  outlined?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  id,
  withSearch = true,
  options,
  multiple = true,
  optionalLabel = "",
  outlined = false,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSelectItem = (item: string) => {
    if (multiple) {
      if (!selectedItems.includes(item)) {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems([item]);
    }
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem !== item)
    );
  };

  const filteredOptions = options;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div id={id} className="flex mt-8 px-2">
      <label className="basis-28 leading-10">{optionalLabel || "Label"}</label>
      <div className="w-full relative">
        <div
          className={`block w-full min-h-10 rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer ${outlined ? "bg-gray-500" : ""}`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex flex-wrap items-center gap-2">
            {selectedItems.map((item) => (
              <div
                className="flex items-center bg-gray-100 px-2 py-0.5 rounded-full"
                key={item}
              >
                {options.find((option) => option.value === item)?.label}
                {multiple && (
                  <button
                    className="ml-1 text-gray-600"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 w-full bg-white overflow-hidden mt-2 border">
            {withSearch && (
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full border-b py-2 pl-10 pr-20 text-gray-900 outline-none"
                />
              </div>
            )}
            <div className="border-none max-h-80 overflow-y-auto">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2  cursor-pointer bg-white text-black"
                  onClick={() => handleSelectItem(option.value)}
                >
                  <Highlighter
                    highlightClassName="bg-yellow-300"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={option.label}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;
