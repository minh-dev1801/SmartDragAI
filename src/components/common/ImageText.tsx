import Image from "./Image";

interface ImageTextProps {
  src: string;
  alt: string;
  text: string;
  divClassName?: string;
  imageClassName?: string;
  textClassName?: string;
}

const ImageText = ({
  src,
  alt,
  text,
  divClassName = "",
  imageClassName = "",
  textClassName = "",
}: ImageTextProps) => {
  return (
    <>
      <div className={`flex-row-center ${divClassName}`}>
        <Image src={src} alt={alt} className={`${imageClassName}`} />
        <p className={`text-sm text-gray-700 ${textClassName}`}>{text}</p>
      </div>
    </>
  );
};

export default ImageText;
