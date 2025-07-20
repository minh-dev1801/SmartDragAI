import type { ReactNode } from "react";

interface IconTextProps {
  icon: ReactNode;
  text: string;
  divClassName?: string;
  textClassName?: string;
}

const IconText = ({
  icon,
  text,
  divClassName = "",
  textClassName = "",
}: IconTextProps) => {
  return (
    <>
      <div className={`flex-row-center ${divClassName}`}>
        {icon}
        <p className={`text-sm text-gray-700 ${textClassName}`}>{text}</p>
      </div>
    </>
  );
};

export default IconText;
