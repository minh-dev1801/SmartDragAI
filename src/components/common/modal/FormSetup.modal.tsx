import { Button, Col, Flex, Row } from "antd";
import { useState } from "react";
import {
  MdClose,
  MdAdd,
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

const FormSetup = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [formComponents, setFormComponents] = useState([
    {
      id: 1,
      type: "layout-row",
      title: "Layout Row",
      children: [
        {
          id: 2,
          type: "layout-column",
          title: "Layout Column",
          children: [
            {
              id: 3,
              type: "section",
              title: "Section",
              children: [
                {
                  id: 4,
                  type: "group",
                  title: "Group",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const componentTypes = [
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

  const dataTypes = [
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

  const renderComponent = (component, depth = 0) => {
    const getBackgroundColor = (type) => {
      switch (type) {
        case "layout-row":
          return "bg-blue-100 border-blue-300";
        case "layout-column":
          return "bg-green-100 border-green-300";
        case "section":
          return "bg-purple-100 border-purple-300";
        case "group":
          return "bg-red-100 border-red-300";
        default:
          return "bg-gray-100 border-gray-300";
      }
    };

    const getTextColor = (type) => {
      switch (type) {
        case "layout-row":
          return "text-blue-700";
        case "layout-column":
          return "text-green-700";
        case "section":
          return "text-purple-700";
        case "group":
          return "text-red-700";
        default:
          return "text-gray-700";
      }
    };

    return (
      <div
        key={component.id}
        className={`border-2 border-dashed rounded-lg p-4 mb-4 ${getBackgroundColor(
          component.type
        )}`}
        style={{ marginLeft: depth * 8 }}
      >
        <div className={`font-medium mb-2 ${getTextColor(component.type)}`}>
          {component.title}
        </div>
        {component.children &&
          component.children.map((child) => renderComponent(child, depth + 1))}
        {component.type === "layout-row" && (
          <button className="flex items-center text-gray-600 text-sm mt-2">
            <MdAdd className="w-4 h-4 mr-1" />
            Thêm Layout Row
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Thiết lập biểu mẫu</h2>
        </div>
      </div>
      <div className="flex bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-190px)] overflow-auto">
          {/* Container Section */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Container
            </h3>
            <div className="space-y-2">
              {componentTypes.map((component) => (
                <div
                  key={component.id}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <component.icon
                    className={`w-4 h-4 mr-2 ${component.color}`}
                  />
                  <span className="text-sm text-gray-700">
                    {component.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Types Section */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Kiểu dữ liệu
            </h3>
            <div className="space-y-2">
              {dataTypes.map((dataType) => (
                <div
                  key={dataType.id}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <dataType.icon className={`w-4 h-4 mr-2 ${dataType.color}`} />
                  <span className="text-sm text-gray-700">{dataType.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Canvas */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="mr-8 mt-4 flex justify-end mb-3">
            <Button variant="outlined" color="primary" size="small">
              Thiết lập thuộc tính trang
            </Button>
          </div>

          {/* Header */}

          {/* Canvas */}
          <div className="flex-1 px-6 overflow-auto">
            <div className="border border-gray-200 p-1 flex gap-1 cursor-pointer mb-4 rounded">
              <MdCropSquare className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600">Tiêu đề màn hình</span>
            </div>

            <div className="max-w-full">
              {formComponents.map((component) => renderComponent(component))}

              <button className="flex items-center text-gray-600 text-sm">
                <MdAdd className="w-4 h-4 mr-1" />
                Thêm Layout Row
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Thiết lập thuộc tính
              </h3>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="text-center text-gray-500 mt-8">
              <MdCropSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">
                Chọn một thành phần để chỉnh sửa thuộc tính
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
              Thiết lập thuộc tính trang
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSetup;
