import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackTitle = 'Footwear Product',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#ECE5DB] flex items-center justify-center ${containerClassName}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#E7DED4] animate-pulse" />
      )}

      {hasError ? (
        <div className="flex flex-col items-center justify-center p-4 text-center text-[#77716B]">
          <span className="text-xs font-medium tracking-wider uppercase">HR Shoes</span>
          <span className="text-sm font-semibold text-[#111111] mt-1">{fallbackTitle}</span>
          <span className="text-xs text-[#77716B] mt-0.5">Footwear Photography</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
