import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import Image from "../common/Image";
import type { CustomNodeData } from "../../types/CustomNodeData";

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  return (
    <div className="relative flex flex-col items-center bg-white border-[3px] border-blue-500 rounded-xl shadow-lg py-1 px-[28px]">
      <div className="w-[50px] h-[50px] relative flex-row-center">
        <Image src={data.image} alt={data.name} />
        {data.icon && (
          <div className="absolute bottom-0 right-0">{data.icon}</div>
        )}
      </div>

      <div className="text-center text-sm text-gray-800">
        {data.name ? data.name : "Default name"}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="left-1"
        className="!bg-white !border !border-blue-500 !p-1 !-left-[1px]"
      />

      {/* <Handle
        type="target"
        position={Position.Left}
        id="left-2"
        className="py-1 !top-[35%] opacity-0"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-3"
        className="py-1 !top-[21%] opacity-0"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-4"
        className="py-1 !top-[7%] opacity-0"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-5"
        className="py-1 !top-[65%] opacity-0"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-6"
        className="py-1 !top-[80%] opacity-0"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-7"
        className="py-1 !top-[95%] opacity-0"
      /> */}

      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-white !border !border-blue-500 !p-1 !-right-[1px]"
      />

      {/* <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!bg-white !border !border-blue-500 !p-1 !-top-[1px]"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!bg-white !border !border-blue-500 !p-1 !-bottom-[1px]"
      /> */}
    </div>
  );
};

export default memo(CustomNode);
