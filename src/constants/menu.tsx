import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Element from "../components/tabs/Element";
import Resource from "../components/tabs/Resource";
import Variable from "../components/tabs/Variable";

export const tabItems = [
  { label: "Thành phần", key: "1", children: <Element /> },
  { label: "Tài nguyên", key: "2", children: <Resource /> },
  { label: "Biến", key: "3", children: <Variable /> },
];

export const menuItems = [
  { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "User",
    children: [
      { key: "3", label: "Tom" },
      { key: "4", label: "Bill" },
      { key: "5", label: "Alex" },
    ],
  },
  {
    key: "sub2",
    icon: <TeamOutlined />,
    label: "Team",
    children: [
      { key: "6", label: "Team 1" },
      { key: "8", label: "Team 2" },
    ],
  },
  { key: "9", icon: <FileOutlined />, label: "Files" },
];
