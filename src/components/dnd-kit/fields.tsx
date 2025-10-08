import { Input } from "antd";
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

export const fields = [
  {
    type: "section",
    name: "Section",
    icon: MdCropSquare,
    color: "text-purple-600",
  },
  {
    type: "tab-section",
    name: "Tab-Section",
    icon: MdTab,
    color: "text-purple-600",
  },
  { type: "group", name: "Group", icon: MdFolder, color: "text-red-500" },
  {
    type: "display-box",
    name: "Display Box",
    icon: MdViewModule,
    color: "text-orange-500",
  },
  {
    type: "button-group",
    name: "Button Group",
    icon: MdCropSquare,
    color: "text-green-600",
  },
  {
    type: "text-short",
    name: "Văn bản ngắn",
    icon: MdTextFields,
    color: "text-purple-600",
  },
  {
    type: "text-long",
    name: "Văn bản dài",
    icon: MdList,
    color: "text-blue-500",
  },
  {
    type: "link",
    name: "Đường dẫn liên kết",
    icon: MdLink,
    color: "text-orange-500",
  },
  { type: "number", name: "Số", icon: MdNumbers, color: "text-blue-600" },
  {
    type: "file-upload",
    name: "Tải lên tệp tin",
    icon: MdFileUpload,
    color: "text-pink-500",
  },
  {
    type: "comment",
    name: "Phần trăm",
    icon: MdComment,
    color: "text-green-600",
  },
  {
    type: "progress",
    name: "Tiến độ",
    icon: MdTimeline,
    color: "text-red-500",
  },
];

export const renderers = {
  input: () => <Input placeholder="This is a text input" />,
  textarea: () => <textarea rows={5} />,
  select: () => (
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  ),
  text: () => (
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  ),
  button: () => <button>Button</button>,
};
