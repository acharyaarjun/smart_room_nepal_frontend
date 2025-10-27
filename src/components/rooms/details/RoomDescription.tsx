"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function RoomDescription({
  description,
}: {
  description: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = description.slice(0, 300);
  const shouldTruncate = description.length > 300;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        About This Property
      </h2>

      <div className="bg-white dark:bg-dropdown rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
            {isExpanded || !shouldTruncate
              ? description
              : `${shortDescription}...`}
          </p>

          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mt-3 transition-colors duration-200"
            >
              {isExpanded ? (
                <>
                  Show less <FaChevronUp className="text-sm" />
                </>
              ) : (
                <>
                  Read more <FaChevronDown className="text-sm" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
