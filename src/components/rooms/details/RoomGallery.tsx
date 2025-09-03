"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BiChevronLeft, BiChevronRight, BiExpand } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

interface Props {
  images?: string[];
}
export default function RoomGallery({ images = [] }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return;

      switch (e.key) {
        case "Escape":
          setShowLightbox(false);
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextImage();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLightbox]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (showLightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLightbox]);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowLightbox(false);
    }
  };

  // Return early if no images
  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[400px] lg:h-[500px]">
          <div className="lg:col-span-3 bg-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-gray-500">No images available</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[400px] lg:h-[500px]">
        {/* Main Image */}
        <div
          className="lg:col-span-3 relative group cursor-pointer"
          onClick={() => setShowLightbox(true)}
        >
          <Image
            height={1000}
            width={1000}
            src={images[selectedImage]}
            alt="Room Main View"
            className="w-full h-full object-cover rounded-2xl"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-2xl flex items-center justify-center">
            <BiExpand className="text-white opacity-0 group-hover:opacity-100 text-2xl transition-all duration-300" />
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Grid - Desktop */}
        <div className="hidden lg:block space-y-4">
          {images.slice(0, 4).map((img, index) => (
            <div
              key={index}
              className={`relative h-[115px] cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                selectedImage === index
                  ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white"
                  : "hover:scale-105"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={img}
                alt={`Room view ${index + 1}`}
                className="w-full h-full object-cover"
                height={500}
                width={500}
                priority
                quality={100}
              />
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    +{images.length - 4} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Thumbnails */}
      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative flex-shrink-0 w-20 h-20 cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                selectedImage === index
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                height={500}
                width={500}
                src={img}
                alt={`Room view ${index + 1}`}
                className="w-full h-full object-cover"
                priority
                quality={100}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              aria-label="Close lightbox"
            >
              <CgClose className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
                aria-label="Previous image"
              >
                <BiChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
                aria-label="Next image"
              >
                <BiChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Main Image Container */}
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <Image
                height={2000}
                width={2000}
                src={images[selectedImage]}
                alt="Room Full View"
                className="max-w-full max-h-full object-contain"
                priority
                quality={100}
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
              {selectedImage + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
