import React from "react";
import { events, gateways, tasks } from "../../constants/flow";
import CardItem from "./CardItem";
import SearchInput from "../common/SearchInput";

const Element: React.FC = () => {
  return (
    <div className="space-y-4">
      <SearchInput />
      <div>
        <h1 className="text-[16px] font-medium text-gray-700 my-4">Tasks</h1>
        {tasks.map((task) => (
          <CardItem nodeConfig={task} />
        ))}
      </div>
      <div className="border-t-1 border-t-gray-300"></div>
      <div>
        <h1 className="text-[16px] font-medium text-gray-700 my-4">Gateways</h1>
        {gateways.map((task) => (
          <CardItem nodeConfig={task} />
        ))}
      </div>
      <div className="border-t-1 border-t-gray-300"></div>
      <div>
        <h1 className="text-[16px] font-medium text-gray-700 my-4">Events</h1>
        {events.map((task) => (
          <CardItem nodeConfig={task} />
        ))}
      </div>
    </div>
  );
};

export default Element;
