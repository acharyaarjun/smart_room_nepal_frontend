import React from "react";
import breadcrumbImage from "@/assets/images/others/breadcrumb.jpg";
import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
};

export default function Hero({
  title,
  description,
  breadcrumb = [{ label: "Home", href: "/" }],
}: HeroProps) {
  return (
    <section id="room-hero" className="w-full relative pt-12">
      <div className="container">
        {/* Background Image */}
        <div className="w-full h-[200px] xl:h-[400px] relative overflow-hidden rounded-2xl">
          <Image
            src={breadcrumbImage}
            alt="Breadcrumb Background"
            className="w-full h-full absolute top-0 left-0 object-cover"
            fill
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          {/* Breadcrumb Navigation */}
          <nav className="text-gray-200 text-sm xl:text-base mb-2 flex flex-wrap justify-center gap-1">
            {breadcrumb.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-1 font-semibold"
              >
                {item.href ? (
                  <Link href={item.href} className="hover:underline text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>

          {/* Title */}
          <h1 className="text-3xl xl:text-6xl font-bold text-white mb-2">
            {title}
          </h1>

          {/* Description / Body */}
          {description && (
            <p className="text-white/80 text-sm md:text-lg max-w-2xl font-medium">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
