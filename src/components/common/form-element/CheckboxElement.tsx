"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa"; // ✅ Using react-icons

interface Props {
  title: string;
  isRequired?: boolean;
  value: boolean;
  name: string;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  disabled?: boolean;
  description?: string;
}

const CheckboxElement: React.FC<Props> = ({
  title,
  isRequired = false,
  value,
  name,
  error,
  onChange,
  onBlur,
  disabled = false,
  description,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={`flex items-center gap-3 cursor-pointer select-none ${
          disabled ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {/* Custom checkbox wrapper */}
        <div
          className={`
            relative flex items-center justify-center h-5 w-5 rounded-md border transition-all duration-200 ease-in-out
            ${
              disabled
                ? "bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                : error
                ? value
                  ? "border-red-500 bg-red-500"
                  : "border-red-500 bg-transparent"
                : value
                ? "border-primary bg-primary"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            }
            ${isFocused && !disabled ? "" : ""}
          `}
        >
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={value}
            onChange={onChange}
            onBlur={() => {
              onBlur();
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            disabled={disabled}
            className="absolute opacity-0 h-full w-full cursor-pointer z-10"
            aria-describedby={description ? `${name}-description` : undefined}
          />

          {/* Checkmark icon */}
          <FaCheck
            className={`text-white text-[10px] transition-all duration-200 ${
              value ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          />
        </div>

        {/* Label & description */}
        <div className="">
          <span
            className={`font-medium ${
              disabled ? "text-gray-400 dark:text-gray-500" : "text-normal"
            }`}
          >
            {title} {isRequired && <span className="text-red-500">*</span>}
          </span>

          {description && (
            <p
              id={`${name}-description`}
              className={`mt-1 text-xs ${
                disabled
                  ? "text-gray-400 dark:text-gray-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </label>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-2 flex items-center gap-1">
          ⚠ {error}
        </p>
      )}
    </div>
  );
};

export default CheckboxElement;
