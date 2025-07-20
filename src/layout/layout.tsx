import React from "react";
import { Tabs } from "antd";
import { tabItems } from "../constants/menu";
import DnDFlow from "../components/flow/DnDFlow";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

export const Layout: React.FC = () => {
  return (
    <div className="h-screen min-h-screen max-h-screen flex gap-4">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="border-b border-b-gray-200 absolute w-full h-10 top-[37px] -z-[1] right-0"></div>
        <div className="flex gap-4 mt-4">
          <div className="w-1/4 h-full overflow-y-auto py-2 px-4 border border-gray-300 rounded-lg">
            <Tabs items={tabItems} />
          </div>
          <div className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mr-4">
            <DnDFlow />
          </div>
        </div>
      </div>
    </div>
  );
};
