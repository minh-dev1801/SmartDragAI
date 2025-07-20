import { Layout as AntLayout, Menu } from "antd";
import Image from "../common/Image";
import { menuItems } from "../../constants/menu";
import { useState } from "react";

const { Sider } = AntLayout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme="light"
      width="220"
      className={`!border-r !border-r-gray-300 ${collapsed && "!bg-blue-500"}`}
    >
      <div className="flex items-center gap-2 justify-center mt-4 mb-8">
        <Image
          src="/logo.jpg"
          alt="logo"
          className="w-14 rounded-full border border-gray-300 p-[2px]"
        />
        {!collapsed && (
          <h1 className="text-lg text-gray-700 font-semibold">DragAi</h1>
        )}
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={menuItems}
        className={`!border-r !border-r-gray-300 ${
          collapsed && "!bg-blue-500"
        }`}
      />
    </Sider>
  );
};

export default Sidebar;
