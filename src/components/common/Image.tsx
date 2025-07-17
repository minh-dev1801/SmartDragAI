import type React from "react";

const Image = ({
  src,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.png";
        e.currentTarget.onerror = null;
      }}
      loading="lazy"
      {...props}
    />
  );
};

export default Image;
