// src/components/MyImage.tsx
import Image from "next/image";

interface MyImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function MyImage({
  src,
  alt = "image",
  className = "",
}: MyImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={500}
      className={`rounded-xl shadow-lg object-cover ${className}`}
    />
  );
}