import { MarkerType } from "@xyflow/react";
import CustomNode from "../components/flow/CustomNode.tsx";
import ComputerIcon from "../components/icons/ComputerIcon";

export const nodeTypes = {
  custom: CustomNode,
};

export const tasks = [
  { name: "User Task", image: "/nodes/user-task.svg", icon: null },
  { name: "Send Email", image: "/nodes/email-task.svg", icon: null },
  {
    name: "Send HTTP Request",
    image: "/nodes/http-request-task.svg",
    icon: null,
  },
  { name: "Organization", image: "/nodes/organization-task.svg", icon: null },
  {
    name: "Send Notification",
    image: "/nodes/notification-task.svg",
    icon: null,
  },
  {
    name: "Create or Update Record",
    image: "/nodes/record-task.svg",
    icon: null,
  },
  { name: "Get Record", image: "/nodes/get-record-task.svg", icon: null },
  { name: "Loop", image: "/nodes/loop-task.svg", icon: null },
];

export const gateways = [
  {
    name: "Exclusive gateway",
    image: "/nodes/exclusive-gateway.svg",
    icon: null,
  },
  {
    name: "Inclusive gateway",
    image: "/nodes/inclusive-gateway.svg",
    icon: null,
  },
  {
    name: "Parallel gateway",
    image: "/nodes/parallel-gateway.svg",
    icon: null,
  },
];

export const events = [
  { name: "Wait", image: "/nodes/wait-task.svg", icon: null },
  { name: "End", image: "/nodes/end-event.svg", icon: null },
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
      image: "/nodes/start-manual-event.svg",
      icon: <ComputerIcon />,
      name: "Start",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "dndnode_2",
    type: "custom",
    data: { image: "/nodes/user-task.svg", icon: null, name: "Root" },
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
