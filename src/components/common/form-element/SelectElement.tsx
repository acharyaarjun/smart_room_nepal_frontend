"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import SimpleBar from "simplebar-react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  isRequired?: boolean;
  placeholder?: string;
  value: string | null;
  name: string;
  error: string | null;
  onChange: (value: string | null) => void;
  onBlur: () => void;
  options: Option[];
  disabled?: boolean;
}

const SelectElement: React.FC<Props> = ({
  title,
  isRequired = false,
  placeholder = "Select...",
  value,
  name,
  error,
  onChange,
  onBlur,
  options,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedOption = options.find((opt) => opt.value === value) || null;

  // Function to close dropdown and reset state
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    onBlur();
    setSearchTerm("");
    setHighlightedIndex(-1);
  }, [onBlur]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    }

    function handleResize() {
      if (isOpen) {
        closeDropdown();
      }
    }

    // function handleScroll() {
    //   if (isOpen) {
    //     closeDropdown();
    //   }
    // }

    // Only add event listeners when dropdown is open
    if (isOpen) {
      // Add listeners after current event loop to prevent immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside, true);
        document.addEventListener("touchstart", handleClickOutside, true);
        window.addEventListener("resize", handleResize);
        // window.addEventListener("scroll", handleScroll, true);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside, true);
        document.removeEventListener("touchstart", handleClickOutside, true);
        window.removeEventListener("resize", handleResize);
        // window.removeEventListener("scroll", handleScroll, true);
      };
    }

    return () => {
      // Cleanup function when isOpen changes to false or component unmounts
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
      window.removeEventListener("resize", handleResize);
      // window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, closeDropdown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option: Option | null) => {
    onChange(option ? option.value : null);
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleToggle = (e?: React.MouseEvent) => {
    if (!disabled) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setIsOpen(!isOpen);
      setHighlightedIndex(-1);
      setSearchTerm("");
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex !== -1) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        closeDropdown();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="w-full">
      <style>
        {`
          /* SimpleBar styling */
          .simplebar-scrollbar::before {
            background-color: var(--color-input-border);
            border-radius: 4px;
            opacity: 0.6;
          }

          .simplebar-scrollbar:hover::before {
            background-color: var(--color-primary);
            opacity: 1;
          }

          .simplebar-track {
            background-color: transparent;
          }

          .simplebar-track.simplebar-vertical {
            width: 8px;
          }

          /* Dark mode scrollbar styling */
          .dark .simplebar-scrollbar::before {
            background-color: var(--color-input-border-dark);
          }

          .dark .simplebar-scrollbar:hover::before {
            background-color: var(--color-primary);
          }
        `}
      </style>
      <label htmlFor={name} className="block text-normal font-medium mb-1">
        {title} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`
          w-full px-3 py-2.5 border rounded-lg shadow-sm focus:outline-none transition relative
          ${
            error
              ? "border-red-500"
              : isOpen
              ? "border-primary"
              : "border-gray-300 dark:border-gray-600"
          }
          ${!disabled && "cursor-pointer"}
          ${
            disabled
              ? "bg-gray-100 dark:bg-dropdown text-gray-500 dark:text-gray-400"
              : "bg-transparent text-gray-700 dark:text-white"
          }
          ${isOpen && "border-primary"}
        `}
        onClick={(e) => handleToggle(e)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="flex justify-between items-center text-sm">
          <span
            className={`${
              !selectedOption && "text-gray-400 dark:text-gray-500"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2.5 rounded-lg shadow-lg bg-white text-sm dark:bg-dropdown z-50 overflow-hidden border border-gray-200 dark:border-gray-700">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHighlightedIndex(0);
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <SimpleBar style={{ maxHeight: "15rem" }} className="py-1" autoHide>
              <ul>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={option.value}
                      className={`
                        px-4 py-2.5 cursor-pointer
                        ${
                          index === highlightedIndex
                            ? "bg-gray-200 dark:bg-gray-600 font-semibold"
                            : ""
                        }
                        hover:bg-gray-100 dark:hover:bg-gray-700
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(option);
                      }}
                    >
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                    No results found.
                  </li>
                )}
              </ul>
            </SimpleBar>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 italic mt-1">{error}</p>}
    </div>
  );
};

export default SelectElement;
