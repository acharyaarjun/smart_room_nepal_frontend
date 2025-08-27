"use client";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: "left" | "right" | "center";
  triggerMode?: "hover" | "click";
  onClose?: () => void;
  className?: string;
}

export default function Dropdown({
  trigger,
  children,
  position = "left",
  triggerMode = "hover",
  onClose,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Close dropdown if user scrolls outside the dropdown
  useEffect(() => {
    function handleScroll(event: Event) {
      const target = event.target as HTMLElement;
      if (!dropdownRef.current?.contains(target)) {
        setOpen(false);
        onClose?.();
      }
    }

    if (open) {
      document.addEventListener("scroll", handleScroll, true);
    } else {
      document.removeEventListener("scroll", handleScroll, true);
    }

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, onClose]);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
      onMouseEnter={() => triggerMode === "hover" && setOpen(true)}
      onMouseLeave={() => triggerMode === "hover" && setOpen(false)}
    >
      <div
        onClick={() =>
          triggerMode === "click" ? setOpen((prev) => !prev) : undefined
        }
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {open && (
        <div
          className={clsx(
            "absolute top-full pt-2 z-50",
            position === "right" && "right-0",
            position === "left" && "left-0",
            position === "center" && "left-1/2 -translate-x-1/2"
          )}
        >
          <div
            className={clsx(
              "max-h-96 overflow-y-auto min-w-[180px] p-2 rounded-lg shadow-lg transition-all duration-200 ease-in-out",
              "bg-white text-[var(--color-dark)] border border-gray-200",
              "dark:bg-[var(--color-dark)] dark:text-[var(--color-light)] dark:border-gray-700",
              "backdrop-blur-sm",
              className
            )}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
