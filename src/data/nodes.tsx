import CustomNode from "../components/Flow/CustomNode";
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

export const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: {
      image: "/plug-and-play.png",
      icon: <ComputerIcon />,
      name: "Start",
    },
    position: { x: -150, y: 150 },
  },
  {
    id: "2",
    type: "custom",
    data: { image: "/project-management.png", icon: null, name: "Root" },
    position: { x: 100, y: 150 },
  },
];
