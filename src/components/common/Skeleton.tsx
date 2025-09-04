import React, { JSX } from "react";
import clsx from "clsx";

interface SkeletonProps {
  /**
   * Height class for the skeleton.
   * @default "h-6"
   */
  height?: string;

  /**
   * Width class for the skeleton.
   * @default "w-full"
   */
  width?: string;

  /**
   * Border-radius class for the skeleton.
   * @default "rounded"
   */
  rounded?: string;

  /**
   * Additional Tailwind CSS class names.
   */
  className?: string;
}

/**
 * A flexible and reusable Skeleton loader component used as a placeholder
 * while the actual content is being loaded. It supports dynamic width, height,
 * and rounding, making it suitable for various UI elements.
 *
 * @component
 * @example
 * <Skeleton />
 * <Skeleton height="h-10" width="w-1/3" rounded="rounded-md" />
 */
export default function Skeleton({
  height = "h-6",
  width = "w-full",
  rounded = "rounded",
  className = "",
}: SkeletonProps): JSX.Element {
  return (
    <div
      className={clsx(
        "bg-gray-300 animate-pulse",
        height,
        width,
        rounded,
        className
      )}
    />
  );
}
