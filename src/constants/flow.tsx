import { MarkerType } from "@xyflow/react";
import CustomNode from "../components/flow/CustomNode";
import ComputerIcon from "../components/icons/ComputerIcon";

export const nodeTypes = {
  custom: CustomNode,
};

export const tasks = [
  { name: "User Task", image: "/project-management.png", icon: null },
  { name: "Send Email", image: "/project-management.png", icon: null },
  { name: "Send HTTP Request", image: "/project-management.png", icon: null },
  {
    name: "Create or Update Record",
    image: "/project-management.png",
    icon: null,
  },
];

export const events = [
  { name: "Wait", image: "/project-management.png", icon: null },
  { name: "End", image: "/project-management.png", icon: null },
];

export const gateways = [
  { name: "Exclusive gateway", image: "/project-management.png", icon: null },
  { name: "Inclusive gateway", image: "/project-management.png", icon: null },
  { name: "Parallel gateway", image: "/project-management.png", icon: null },
];

export const connectionLineStyle = {
  stroke: "#3b82f6",
  strokeWidth: 2,
  markerEnd: "url(#connection-marker)",
};

export const initialNodes = [
  {
    id: "dndnode_1",
    type: "custom",
    data: {
      image: "/plug-and-play.png",
      icon: <ComputerIcon />,
      name: "Start",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "dndnode_2",
    type: "custom",
    data: { image: "/project-management.png", icon: null, name: "Root" },
    position: { x: 0, y: 0 },
  },
];

export const initialEdges = [
  {
    id: "dndnode_1-dndnode_2",
    source: "dndnode_1",
    target: "dndnode_2",
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
];
