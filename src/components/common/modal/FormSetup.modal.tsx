import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import Announcements from "../../dnd-kit/Announcements";
import { SidebarField, Sidebar } from "../../dnd-kit/Sidebar";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Form, Input, Checkbox, Button, Divider, message } from "antd";
import { Field, Canvas } from "../../dnd-kit/Canvas";
import { useImmer } from "use-immer";
import type {
  FieldType,
  FieldTypeData,
  SidebarFieldType,
} from "../../../types/dnd-kit";
import { MdCropSquare, MdDownload } from "react-icons/md";
import { exportCamundaFormConfig } from "../../dnd-kit/ExportForm";

const { TextArea } = Input;

function getData(prop) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id }) {
  return {
    id,
    type: "spacer",
    name: "spacer",
    title: "spacer",
  };
}

interface FieldFormType extends FieldType {
  description?: string;
  defaultValue?: string;
  options?: string;
  required?: boolean;
}

// Properties Panel Component
const PropertiesPanel: React.FC<{
  selectedField: FieldFormType | undefined;
  onUpdateField: (
    fieldId: string | number,
    updates: Partial<FieldFormType>
  ) => void;
  onDownloadConfig: () => void;
}> = ({ selectedField, onUpdateField, onDownloadConfig }) => {
  const [form] = Form.useForm<FieldFormType>();

  useEffect(() => {
    if (selectedField) {
      form.setFieldsValue({
        title: selectedField.title || "",
        description: selectedField.description || "",
        name: selectedField.name || "",
        defaultValue: selectedField.defaultValue || "",
        options: selectedField.options || "",
        required: selectedField.required || false,
      });
    }
  }, [selectedField, form]);

  const handleFinish = (values: FieldFormType) => {
    if (selectedField) {
      onUpdateField(selectedField.id, values);
      message.success("Thuộc tính đã được cập nhật thành công!");
    } else {
      message.error("Vui lòng chọn một trường để cập nhật!");
    }
  };

  if (!selectedField) {
    return (
      <div style={{ textAlign: "center", marginTop: 32, color: "#8c8c8c" }}>
        <MdCropSquare
          style={{
            width: 48,
            height: 48,
            margin: "0 auto 16px",
            color: "#d9d9d9",
          }}
        />
        <p style={{ fontSize: 14 }}>
          Chọn một thành phần để chỉnh sửa thuộc tính
        </p>
      </div>
    );
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ padding: 16 }}
    >
      <Form.Item<FieldFormType>
        label="Tên trường"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tên trường!" }]}
      >
        <Input placeholder="Nhập tên trường" />
      </Form.Item>

      <Form.Item<FieldFormType> label="Mô tả trường" name="description">
        <TextArea rows={3} placeholder="Nhập mô tả trường" />
      </Form.Item>

      <Form.Item<FieldFormType>
        label="Tên biến"
        name="name"
        extra="Liên kết với biến form"
        rules={[{ required: true, message: "Vui lòng nhập tên biến!" }]}
      >
        <Input placeholder="Nhập tên biến" />
      </Form.Item>

      <Form.Item<FieldFormType> label="Giá trị mặc định" name="defaultValue">
        <Input placeholder="Nhập giá trị mặc định" />
      </Form.Item>

      {selectedField.type === "select" && (
        <Form.Item<FieldFormType>
          label="Tùy chọn"
          name="options"
          rules={[
            { required: true, message: "Vui lòng nhập ít nhất một tùy chọn!" },
          ]}
        >
          <TextArea rows={4} placeholder="Mỗi tùy chọn một dòng" />
        </Form.Item>
      )}

      <Form.Item<FieldFormType>
        name="required"
        valuePropName="checked"
        label={null}
      >
        <Checkbox>Bắt buộc</Checkbox>
      </Form.Item>

      <Divider />

      <Form.Item<FieldFormType> label={null}>
        <Button type="primary" htmlType="submit" block>
          Lưu thay đổi
        </Button>
      </Form.Item>
      <Form.Item<FieldFormType> label={null}>
        <Button
          type="default"
          icon={<MdDownload />}
          onClick={onDownloadConfig}
          block
        >
          Tải xuống cấu hình biểu mẫu
        </Button>
      </Form.Item>
    </Form>
  );
};

const FormSetup = () => {
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now()
  );
  const [selectedFieldId, setSelectedFieldId] = useState<string | number>();
  const spacerInsertedRef = useRef(false);
  const currentDragFieldRef = useRef<FieldType | null>(null);
  const [activeSidebarField, setActiveSidebarField] =
    useState<SidebarFieldType | null>(null);
  const [activeField, setActiveField] = useState<FieldType | null>(null);
  const [data, updateData] = useImmer<FieldTypeData>({
    fields: [],
  });

  const { fields } = data;
  const selectedField = fields.find((field) => field.id === selectedFieldId);

  // Hàm cập nhật thuộc tính trường
  const handleUpdateField = (
    fieldId: string | number,
    updates: Partial<FieldFormType>
  ) => {
    updateData((draft) => {
      const fieldIndex = draft.fields.findIndex((f) => f.id === fieldId);
      if (fieldIndex > -1) {
        draft.fields[fieldIndex] = {
          ...draft.fields[fieldIndex],
          ...updates,
        };
      }
    });
  };

  // Hàm tải cấu hình biểu mẫu
  const handleDownloadConfig = () => {
    // try {
    //   const formConfig = {
    //     fields: fields.filter((field) => field.type !== "spacer"),
    //   };
    //   const jsonString = JSON.stringify(formConfig, null, 2);
    //   const blob = new Blob([jsonString], {
    //     type: "application/json;charset=utf-8",
    //   });
    //   const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    //   const fileName = `form-config-${timestamp}.json`;
    //   saveAs(blob, fileName);
    //   message.success(`Đã tải xuống cấu hình biểu mẫu: ${fileName}`);
    // } catch (error) {
    //   console.error("Lỗi khi tải xuống:", error);
    //   message.error("Có lỗi xảy ra khi tải xuống cấu hình biểu mẫu");
    // }
    exportCamundaFormConfig(fields);  
  };

  const cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  const handleFieldSelect = (fieldId: string) => {
    setSelectedFieldId(fieldId);
  };

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;

    const activeData = getData(active);

    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type } = field;

      setActiveSidebarField(field);

      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${fields.length + 1}`,
        title: `${type}${fields.length + 1}`,
      };
    } else {
      const { field, index } = activeData;

      setActiveField(field);

      currentDragFieldRef.current = field;

      updateData((draft) => {
        draft.fields.splice(index, 1, createSpacer({ id: active.id }));
      });
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    const activeData = getData(active);

    // Chỉ xử lý khi kéo từ sidebar
    if (!activeData.fromSidebar) return;

    const overData = getData(over);
    const spacerId = `${active.id}-spacer`;

    updateData((draft) => {
      // Tìm chỉ số của spacer hiện tại (nếu có)
      const spacerIndex = draft.fields.findIndex((f) => f.id === spacerId);

      // Trường hợp không có vị trí thả hợp lệ: xóa spacer
      if (!over) {
        if (spacerIndex > -1) {
          draft.fields = draft.fields.filter((f) => f.id !== spacerId);
          spacerInsertedRef.current = false;
        }
        return;
      }

      // Xác định vị trí chèn hoặc di chuyển spacer
      const nextIndex =
        overData.index > -1 ? overData.index : draft.fields.length;

      // Nếu spacer chưa được chèn
      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({ id: spacerId });
        draft.fields.splice(nextIndex, 0, spacer);
        spacerInsertedRef.current = true;
      }
      // Nếu spacer đã tồn tại và cần di chuyển
      else if (spacerIndex > -1 && spacerIndex !== nextIndex) {
        draft.fields = arrayMove(draft.fields, spacerIndex, nextIndex);
      }
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { over } = e;

    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      return;
    }

    const nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = getData(over);

      updateData((draft) => {
        const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(
          draft.fields,
          spacerIndex,
          overData.index || 0
        );
      });
    }

    setSelectedFieldId(nextField?.id);
    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  return (
    <>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Thiết lập biểu mẫu</h2>
        </div>
      </div>

      <div className="flex bg-gray-50">
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          autoScroll
        >
          <Announcements />
          <Sidebar key={sidebarFieldsRegenKey} />
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={fields.map((field) => field.id)}
          >
            <Canvas
              fields={fields}
              selectedFieldId={selectedFieldId}
              onFieldSelect={handleFieldSelect}
            />
          </SortableContext>
          <DragOverlay dropAnimation={null}>
            {activeSidebarField ? (
              <SidebarField overlay field={activeSidebarField} />
            ) : null}
            {activeField ? <Field overlay field={activeField} /> : null}
          </DragOverlay>
        </DndContext>

        {/* Properties Panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                Thiết lập thuộc tính
              </h3>
            </div>
          </div>

          <div className="flex-1 p-4">
            <PropertiesPanel
              selectedField={selectedField}
              onUpdateField={handleUpdateField}
              onDownloadConfig={handleDownloadConfig}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSetup;
