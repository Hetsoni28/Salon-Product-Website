"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { urlFor } from "@/sanity/client";

export interface SanityImageProps {
  image?: Record<string, unknown> | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  fallbackSrc?: string;
}

export const SanityImage: React.FC<SanityImageProps> = ({
  image,
  alt,
  width,
  height,
  fill,
  priority = false,
  quality = 85,
  sizes,
  className,
  fallbackSrc = "/images/product-1.jpg",
}) => {
  const [loaded, setLoaded] = useState(false);

  // A simple 1x1 base64 transparent/light pixel for placeholder
  const blurDataURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";

  let src = fallbackSrc;

  try {
    if (typeof image === "string") {
      src = image;
    } else if (image && Object.keys(image).length > 0) {
      // urlFor is expected to handle the sanity image source
      const builder = urlFor(image).quality(quality);
      if (width) builder.width(width);
      if (height) builder.height(height);
      src = builder.url();
    }
  } catch (error) {
    console.error("Error generating image URL:", error);
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fill ? "w-full h-full" : "",
        !loaded && "bg-brand-cream-dark animate-pulse",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
};

export default SanityImage;

