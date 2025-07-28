import type React from "react";
import { useDnD } from "../../hooks/useDnD";
import Image from "../common/Image";

export interface NodeConfigType {
  name: string;
  image: string;
  icon: null | React.ReactNode;
}

const CardItem = ({ nodeConfig }: { nodeConfig: NodeConfigType }) => {
  const [, setType] = useDnD();

  const onDragStart = (event: React.DragEvent) => {
    setType("custom");
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeConfig)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="p-2.5 my-1.5 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
    >
      <Image
        src={nodeConfig.image}
        alt="User Task icon"
        className="w-10 h-10"
      />
      {nodeConfig.name}
    </div>
  );
};

export default CardItem;
