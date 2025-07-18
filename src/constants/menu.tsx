import Element from "../components/tabs/Element";
import Resource from "../components/tabs/Resource";
import Variable from "../components/tabs/Variable";
import { MdChecklist, MdEditCalendar } from "react-icons/md";

export const tabItems = [
  { label: "Thành phần", key: "1", children: <Element /> },
  { label: "Tài nguyên", key: "2", children: <Resource /> },
  { label: "Biến", key: "3", children: <Variable /> },
];

export const menuItems = [
  {
    key: "sub1",
    icon: <MdEditCalendar />,
    label: "Thiết kế quy trình",
    children: [{ key: "1", label: "Quản lý quy trình" }],
  },
  {
    key: "sub2",
    icon: <MdChecklist />,
    label: "Lượt chạy quy trình",
    children: [
      { key: "2", label: "Danh sách lượt chạy" },
      { key: "3", label: "Các bước đã thực hiện" },
      { key: "4", label: "Các bước cần thực hiện" },
    ],
  },
];
