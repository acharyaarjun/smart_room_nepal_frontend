"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { FiFile, FiUpload, FiX, FiPlus, FiMaximize } from "react-icons/fi";
import Image from "next/image";

interface Props {
  title: string;
  isRequired?: boolean;
  placeholder?: string;
  value: File[] | null;
  name: string;
  error: string | null;
  onChange: (files: File[]) => void;
  onBlur: () => void;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  minSize?: number; // in bytes
  heightClassName?: string;
  widthClassName?: string;
}

const FileSelectElement: React.FC<Props> = ({
  title,
  isRequired = false,
  placeholder = "Click to select files or drag and drop",
  value,
  name,
  error,
  onChange,
  onBlur,
  disabled = false,
  multiple = false,
  accept,
  maxFiles = 10,
  maxSize,
  minSize,
  heightClassName = "h-40",
  widthClassName = "w-full",
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<Map<string, string>>(
    new Map()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = useCallback(
    (files: File[]): { valid: File[]; errors: string[] } => {
      const errors: string[] = [];
      const validFiles: File[] = [];

      const currentFileCount = value ? value.length : 0;
      if (multiple && files.length + currentFileCount > maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return { valid: [], errors };
      }

      files.forEach((file) => {
        if (maxSize && file.size > maxSize) {
          errors.push(
            `File "${file.name}" is too large (max: ${(
              maxSize /
              1024 /
              1024
            ).toFixed(1)}MB)`
          );
          return;
        }

        if (minSize && file.size < minSize) {
          errors.push(
            `File "${file.name}" is too small (min: ${(minSize / 1024).toFixed(
              1
            )}KB)`
          );
          return;
        }

        validFiles.push(file);
      });

      return { valid: validFiles, errors };
    },
    [multiple, maxFiles, maxSize, minSize, value]
  );

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const { valid, errors } = validateFiles(fileArray);

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      const updatedFiles = value ? [...value, ...valid] : valid;
      onChange(updatedFiles);
    },
    [onChange, validateFiles, value]
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      handleFileSelect(files);
      onBlur();
    },
    [disabled, handleFileSelect, onBlur]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
      if (e.target) e.target.value = "";
    },
    [handleFileSelect]
  );

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const handleRemoveFile = useCallback(
    (index: number) => {
      if (!value) return;

      const fileToRemove = value[index];
      const fileKey = `${fileToRemove.name}-${fileToRemove.size}-${fileToRemove.lastModified}`;

      if (previewUrls.has(fileKey)) {
        URL.revokeObjectURL(previewUrls.get(fileKey)!);
        setPreviewUrls((prev) => {
          const newMap = new Map(prev);
          newMap.delete(fileKey);
          return newMap;
        });
      }

      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles);
    },
    [value, onChange, previewUrls, setPreviewUrls]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImageFile = (file: File): boolean => {
    return file.type.startsWith("image/");
  };

  const createImagePreview = (file: File): string => {
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    if (previewUrls.has(fileKey)) {
      return previewUrls.get(fileKey)!;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrls((prev) => new Map(prev).set(fileKey, url));
    return url;
  };

  // Lightbox Handlers
  const openModal = (src: string) => {
    console.log("Opening modal with src:", src); // Debug log
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal"); // Debug log
    setIsModalOpen(false);
    setModalImageSrc(null);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  useEffect(() => {
    if (isModalOpen) {
      const handleClose = () => {
        closeModal();
      };

      window.addEventListener("scroll", handleClose);
      window.addEventListener("resize", handleClose);

      return () => {
        window.removeEventListener("scroll", handleClose);
        window.removeEventListener("resize", handleClose);
      };
    }
  }, [isModalOpen]);

  const hasFiles = value && value.length > 0;

  return (
    <>
      <div className="w-full">
        <label htmlFor={name} className="block text-normal font-medium mb-1">
          {title} {isRequired && <span className="text-red-500">*</span>}
        </label>

        <div
          className={`relative border-2 border-dashed rounded-lg transition-all ${heightClassName} ${widthClassName}
            ${
              isDragOver && !disabled
                ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                : error
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }
            ${
              disabled
                ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60"
                : "cursor-pointer"
            }
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onBlur={onBlur}
        >
          <input
            ref={fileInputRef}
            id={name}
            name={name}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
          />

          {hasFiles ? (
            <div className="p-2 h-full overflow-y-auto">
              <div className="space-y-2">
                {value.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="relative flex items-center justify-between p-2 rounded-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      {isImageFile(file) ? (
                        <div
                          className="group relative w-12 h-12 flex-shrink-0 rounded overflow-hidden border border-gray-200 dark:border-gray-600 cursor-pointer"
                          onClick={() => openModal(createImagePreview(file))}
                        >
                          <Image
                            src={createImagePreview(file)}
                            alt={file.name}
                            fill
                            className="object-cover transition-transform duration-200"
                            sizes="48px"
                          />
                          <div className="absolute inset-0 bg-black hover:opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <FiMaximize className="text-white w-5 h-5" />
                          </div>
                        </div>
                      ) : (
                        <FiFile className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>

                    {!disabled && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(index);
                        }}
                        className="flex-shrink-0 cursor-pointer ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {multiple &&
                  (!maxFiles || (value && value.length < maxFiles)) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                      }}
                      type="button"
                      className="flex items-center justify-center w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 transition-colors"
                    >
                      <FiPlus className="w-4 h-4 mr-1" /> Add more files
                    </button>
                  )}
              </div>
            </div>
          ) : (
            <div
              onClick={handleClick}
              className="p-6 text-center h-full flex justify-center items-center flex-col"
            >
              <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center">
                <FiUpload
                  className={`w-8 h-8 ${
                    isDragOver && !disabled
                      ? "text-blue-500"
                      : error
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Click to upload
                </span>{" "}
                or drag and drop
              </div>

              {placeholder && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {placeholder}
                </p>
              )}

              <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 space-y-1">
                {accept && (
                  <p>
                    Accepted types:{" "}
                    {accept
                      .split(",")
                      .map((type) => type.trim())
                      .join(", ")}
                  </p>
                )}
                {maxSize && <p>Max size: {formatFileSize(maxSize)}</p>}
                {multiple && <p>Max files: {maxFiles}</p>}
              </div>
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500 italic mt-1">{error}</p>}
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && modalImageSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeModal}
        >
          {/* backdrop */}
          <div className="relative max-w-[80vw] max-h-[80vh]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 cursor-pointer text-white hover:text-gray-300 z-50 p-2 rounded-full bg-black opacity-50 border border-primary transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()}
              style={{ width: "auto", height: "auto" }}
            >
              <Image
                src={modalImageSrc}
                alt="File Preview"
                width={800}
                height={600}
                className="max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                unoptimized={true}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileSelectElement;
