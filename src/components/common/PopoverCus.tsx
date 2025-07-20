import { useState, type ReactNode } from "react";
import { Popover } from "antd";

const PopoverCus = ({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      className="cursor-pointer"
    >
      {children}
    </Popover>
  );
};

export default PopoverCus;
