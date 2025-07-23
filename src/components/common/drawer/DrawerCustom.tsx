import { type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { Drawer, Empty } from "antd";

interface DrawerCustomProps {
  children: ReactNode;
  open: boolean;
  onClose: (e: MouseEvent | KeyboardEvent) => void;
  title: ReactNode;
  className: string;
}

const DrawerCustom = ({
  children,
  open,
  onClose,
  title,
  className,
}: DrawerCustomProps) => {
  return (
    <Drawer
      title={title}
      onClose={onClose}
      open={open}
      size="large"
      className={className}
    >
      {children ? children : <Empty />}
    </Drawer>
  );
};

export default DrawerCustom;
