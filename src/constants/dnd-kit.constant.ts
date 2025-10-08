import {
  MdViewModule,
  MdTextFields,
  MdList,
  MdCropSquare,
  MdLink,
  MdNumbers,
  MdFileUpload,
  MdComment,
  MdTimeline,
  MdFolder,
  MdTab,
} from "react-icons/md";

export const componentTypes = [
  {
    id: "section",
    name: "Section",
    icon: MdCropSquare,
    color: "text-purple-600",
  },
  {
    id: "tab-section",
    name: "Tab-Section",
    icon: MdTab,
    color: "text-purple-600",
  },
  { id: "group", name: "Group", icon: MdFolder, color: "text-red-500" },
  {
    id: "display-box",
    name: "Display Box",
    icon: MdViewModule,
    color: "text-orange-500",
  },
  {
    id: "button-group",
    name: "Button Group",
    icon: MdCropSquare,
    color: "text-green-600",
  },
];

export const dataTypes = [
  {
    id: "text-short",
    name: "Văn bản ngắn",
    icon: MdTextFields,
    color: "text-purple-600",
  },
  {
    id: "text-long",
    name: "Văn bản dài",
    icon: MdList,
    color: "text-blue-500",
  },
  {
    id: "link",
    name: "Đường dẫn liên kết",
    icon: MdLink,
    color: "text-orange-500",
  },
  { id: "number", name: "Số", icon: MdNumbers, color: "text-blue-600" },
  {
    id: "file-upload",
    name: "Tải lên tệp tin",
    icon: MdFileUpload,
    color: "text-pink-500",
  },
  {
    id: "comment",
    name: "Phần trăm",
    icon: MdComment,
    color: "text-green-600",
  },
  {
    id: "progress",
    name: "Tiến độ",
    icon: MdTimeline,
    color: "text-red-500",
  },
];
