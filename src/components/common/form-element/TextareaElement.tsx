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

const TextareaElement: React.FC<Props> = ({
  title,
  isRequired = false,
  placeholder,
  value,
  name,
  error,
  onChange,
  onBlur,
  disabled = false,
  minLength,
  maxLength,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-normal font-medium mb-1">
        {title} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        rows={4}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none sm:text-sm transition
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

export default TextareaElement;
