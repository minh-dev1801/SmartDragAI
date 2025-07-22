import { useState, type CSSProperties, type ReactNode } from "react";
import { Popover } from "antd";
import type { TooltipPlacement } from "antd/es/tooltip";
import { css } from "@emotion/css";

interface PopoverCusProps {
  children: ReactNode;
  content: ReactNode;
  placement?: TooltipPlacement;
  className?: string;
  arrowStyles?: CSSProperties;
  popoverStyles?: CSSProperties;
}

const PopoverCus = ({
  children,
  content,
  placement = "bottomRight",
  className = "",
  arrowStyles = {},
  popoverStyles = {},
}: PopoverCusProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const popoverArrowStyle = css({
    "& .ant-popover-arrow": { ...arrowStyles },
    "&": { ...popoverStyles },
  });

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement={placement}
      className={`cursor-pointer ${className}`}
      rootClassName={popoverArrowStyle}
    >
      {children}
    </Popover>
  );
};

export default PopoverCus;
