import { Handle, Position } from "@xyflow/react";
import React, { memo } from "react";
import Image from "../common/Image";

export interface CustomNodeData {
  image: string;
  name: string;
  icon: null | React.ReactNode;
}

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  return (
    <div className="relative flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-md py-1 px-[28px]">
      <div className="w-[50px] relative">
        <Image src={data.image} alt={data.name} />
        {data.icon && (
          <div className="absolute bottom-0 right-0">{data.icon}</div>
        )}
      </div>

      <div className=" text-center text-sm text-gray-800">
        {data.name ? data.name : "Default name"}
      </div>

      <Handle type="target" position={Position.Left} className="!bg-teal-500" />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-teal-500"
      />
    </div>
  );
};

export default memo(CustomNode);
