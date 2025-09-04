"use client";
import React from "react";

interface Props {
  title: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: string;
  value: string | number;
  name: string;
  error: string | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: () => void;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
}

const InputElement: React.FC<Props> = ({
  title,
  isRequired = false,
  placeholder,
  type = "text",
  value,
  name,
  error,
  onChange,
  onBlur,
  inputMode,
  disabled = false,
  min,
  max,
  minLength,
  maxLength,
}) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor={name} className="block text-normal font-medium mb-1">
        {title} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputMode={inputMode}
        disabled={disabled}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        className={`w-full px-3 py-2.5 border rounded-lg shadow-sm focus:outline-none sm:text-sm transition
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-primary dark:border-gray-600"
          }
          disabled:bg-gray-100 disabled:dark:bg-dropdown disabled:cursor-not-allowed bg-transparent`}
      />
      {error && <p className="text-sm text-red-500 italic mt-1">{error}</p>}
    </div>
  );
};

export default InputElement;
