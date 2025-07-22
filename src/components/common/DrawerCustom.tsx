import { type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { Drawer } from "antd";

interface DrawerCustomProps {
  children: ReactNode;
  open: boolean;
  onClose: (e: MouseEvent | KeyboardEvent) => void;
  title: ReactNode;
}

const DrawerCustom = ({
  children,
  open,
  onClose,
  title,
}: DrawerCustomProps) => {
  return (
    <Drawer title={title} onClose={onClose} open={open} size="large">
      {children}
    </Drawer>
  );
};

export default DrawerCustom;
