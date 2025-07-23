import type { ReactNode } from "react";

interface HeaderDrawerProps {
  icon: ReactNode;
  text: string;
}

const HeaderDrawer = ({ icon, text }: HeaderDrawerProps) => {
  return (
    <div className="flex-row-center gap-2">
      {icon}
      <p className="text-2xl text-gray-600">{text}</p>
    </div>
  );
};

export default HeaderDrawer;
