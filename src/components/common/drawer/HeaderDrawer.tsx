import type { ReactNode } from "react";

interface HeaderDrawerProps {
  icon: ReactNode;
  text: string;
}

const HeaderDrawer = ({ icon, text }: HeaderDrawerProps) => {
  return (
    <div className="flex-row-center">
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default HeaderDrawer;
