import "overlayscrollbars/overlayscrollbars.css";
import React, { useEffect, useRef } from "react";
import { events, gateways, tasks } from "../../constants/flow";
import CardItem from "./CardItem";
import SearchInput from "../common/SearchInput";
import { OverlayScrollbars } from "OverlayScrollbars";
import { overlayScrollbarStyles } from "../../constants/styles";

const Element: React.FC = () => {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsRef.current) {
      const tabContent = tabsRef.current.closest(
        ".ant-tabs-content.ant-tabs-content-top"
      );

      if (tabContent instanceof HTMLElement) {
        tabContent.classList.add(overlayScrollbarStyles);

        const osInstance = OverlayScrollbars(tabContent, {
          scrollbars: {
            autoHide: "scroll",
          },
        });

        return () => {
          osInstance.destroy();
        };
      }
    }
  }, []);

  return (
    <div className="space-y-4" ref={tabsRef}>
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
