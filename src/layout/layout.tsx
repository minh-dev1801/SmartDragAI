import React, { useState } from "react";
import { Layout as AntLayout, Menu, Tabs } from "antd";
import { menuItems, tabItems } from "../constants/menu";
import DnDFlow from "../components/Flow/DnDFlow";

const { Sider } = AntLayout;

export const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen gap-4">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
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
