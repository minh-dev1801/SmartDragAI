import React from "react";
import { Breadcrumb, Tabs } from "antd";
import { tabItems } from "../constants/menu";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import { breadcrumb } from "../constants/data";
import { GoInfo } from "react-icons/go";
import PopoverCus from "../components/common/PopoverCus";
import Infor from "../components/contents/Infor";
import { antTabsContentStyles } from "../constants/styles";
import DnDFlow from "../components/flow/DnDFlow";

export const Layout: React.FC = () => {
  return (
    <div className="h-screen min-h-screen max-h-screen flex gap-4">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="border-b border-b-gray-200 absolute w-full h-10 top-[37px] -z-[1] right-0"></div>
        <div className="mt-3">
          <Breadcrumb items={breadcrumb} />
        </div>
        <div className="mt-4 flex-row-center gap-2">
          <h1 className="text-xl font-600 text-gray-700">Tạo quy trình</h1>
          <PopoverCus
            content={<Infor />}
            placement="bottomLeft"
            popoverStyles={{ inset: "162px auto auto 355px !important" }}
          >
            <GoInfo className="text-gray-400 cursor-pointer mt-1" size={16} />
          </PopoverCus>
        </div>
        <div className="flex gap-4 mt-4 h-[calc(100vh-190px)]">
          <div className="w-1/4 py-2 pl-4 pr-2 border border-gray-300 rounded-lg relative">
            <Tabs items={tabItems} className={antTabsContentStyles} />
          </div>
          <div className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mr-4">
            <DnDFlow />
          </div>
        </div>
      </div>
    </div>
  );
};
