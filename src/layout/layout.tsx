import React, { useState } from "react";
import { Layout as AntLayout, Menu, Tabs } from "antd";
import { menuItems, tabItems } from "../constants/menu";
import DnDFlow from "../components/Flow/DnDFlow";
import Image from "../components/common/Image";

const { Sider } = AntLayout;

export const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen min-h-screen max-h-screen flex gap-4">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
        width="220"
        className={`!border-r !border-r-gray-300 ${
          collapsed && "!bg-blue-500"
        }`}
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
      <div className="w-1/4 h-full overflow-y-auto py-2 px-4 border border-gray-300 rounded-lg">
        <Tabs items={tabItems} />
      </div>
      <div className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mr-4">
        <DnDFlow />
      </div>
    </div>
  );
};
