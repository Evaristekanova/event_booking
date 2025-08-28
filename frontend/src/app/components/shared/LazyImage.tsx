"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  fallback?: string;
  priority?: boolean;
  maintainAspectRatio?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgMTIwSDI0MFYxODBIMTYwVjEyMFoiIGZpbGw9IiNEM0Q3RDEiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwQzIwIDMxLjA0NTcgMjguOTU0MyA0MCA0MCA0MEM1MS4wNDU3IDQwIDYwIDMxLjA0NTcgNjAgMjBDNjAgOC45NTQzIDUxLjA0NTcgMCA0MCAwQzI4Ljk1NDMgMCAyMCA4Ljk1NDMgMjAgMjBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo8L3N2Zz4K",
  fallback = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkY0QjRCIi8+CjxwYXRoIGQ9Ik0xNjAgMTIwSDI0MFYxODBIMTYwVjEyMFoiIGZpbGw9IiNGRjY2NjYiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIwQzIwIDMxLjA0NTcgMjguOTU0MyA0MCA0MCA0MEM1MS4wNDU3IDQwIDYwIDMxLjA0NTcgNjAgMjBDNjAgOC45NTQzIDUxLjA0NTcgMCA0MCAwQzI4Ljk1NDMgMCAyMCA4Ljk1NDMgMjAgMjBaIiBmaWxsPSIjRkY4ODg4Ii8+Cjwvc3ZnPgo8L3N2Zz4K",
  priority = false,
  maintainAspectRatio = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      setCurrentSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setCurrentSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setCurrentSrc(fallback);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Fallback Image */}
      {!isLoaded && (
        <Image
          src={hasError ? fallback : placeholder}
          alt="Loading..."
          width={width}
          height={height}
          className="object-cover transition-opacity duration-300 w-full h-full"
          style={{
            opacity: isLoaded ? 0 : 1,
            ...(maintainAspectRatio && { height: "auto" }),
          }}
        />
      )}

      {/* Actual Image */}
      {isInView && (
        <Image
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover transition-opacity duration-300 w-full h-full ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          style={maintainAspectRatio ? { height: "auto" } : {}}
        />
      )}

      {/* Loading Spinner */}
      {!isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;

/*
Usage Examples:

// Basic usage with aspect ratio maintained
<LazyImage
  src="image.jpg"
  alt="Description"
  width={400}
  height={300}
  className="rounded-lg"
/>

// For fixed dimensions (no aspect ratio maintenance)
<LazyImage
  src="image.jpg"
  alt="Description"
  width={400}
  height={300}
  maintainAspectRatio={false}
  className="w-full h-48"
/>

// For responsive images that maintain aspect ratio
<LazyImage
  src="image.jpg"
  alt="Description"
  width={400}
  height={300}
  maintainAspectRatio={true}
  className="w-full h-auto"
/>
*/
