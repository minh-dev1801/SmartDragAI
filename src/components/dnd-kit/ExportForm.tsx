import { saveAs } from "file-saver";
import { message } from "antd";
import type { FieldType } from "../../types/dnd-kit";

interface FieldFormType extends FieldType {
  description?: string;
  defaultValue?: string;
  options?: string;
  required?: boolean;
}

// Mapping từ type nội bộ sang type Camunda
const TYPE_MAPPING: Record<string, string> = {
  text: "textfield",
  email: "textfield",
  number: "number",
  select: "select",
  textarea: "textarea",
  checkbox: "checkbox",
  date: "textfield",
};

// Hàm chuyển đổi field sang format Camunda
const convertFieldToCamundaFormat = (
  field: FieldFormType,
  index: number
): any => {
  const camundaField: any = {
    label: field.title || field.name,
    type: TYPE_MAPPING[field.type] || "textfield",
    layout: {
      row: `Row_${generateId(index)}`,
      columns: null,
    },
    id: `Field_${generateId(index)}`,
    key: field.name || `field_${index}`,
  };

  // Thêm description nếu có
  if (field.description) {
    camundaField.description = field.description;
  }

  // Thêm default value nếu có
  if (field.defaultValue) {
    camundaField.defaultValue = field.defaultValue;
  }

  // Thêm validation
  const validate: any = {};

  if (field.required) {
    validate.required = true;
  }

  // Thêm pattern validation cho email
  if (field.type === "email") {
    validate.pattern = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
  }

  // Thêm pattern validation cho number
  if (field.type === "number") {
    validate.pattern = "^(?:0|[1-9][0-9]*)$";
  }

  if (Object.keys(validate).length > 0) {
    camundaField.validate = validate;
  }

  // Xử lý select options
  if (field.type === "select" && field.options) {
    const optionsArray = field.options
      .split("\n")
      .filter((opt) => opt.trim())
      .map((opt) => ({
        label: opt.trim(),
        value: opt.trim().toLowerCase().replace(/\s+/g, "_"),
      }));

    if (optionsArray.length > 0) {
      camundaField.values = optionsArray;
    }
  }

  return camundaField;
};

// Hàm tạo ID ngẫu nhiên
const generateId = (seed: number): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  let num = seed + Date.now();

  for (let i = 0; i < 7; i++) {
    result += chars[num % chars.length];
    num = Math.floor(num / chars.length) + i;
  }

  return result;
};

/**
 * Xuất cấu hình form theo định dạng Camunda
 */
export const exportCamundaFormConfig = (fields: FieldFormType[]): void => {
  try {
    // Lọc bỏ các spacer
    const validFields = fields.filter((field) => field.type !== "spacer");

    if (validFields.length === 0) {
      message.warning("Không có trường nào để xuất");
      return;
    }

    // Chuyển đổi các fields sang format Camunda
    const components = validFields.map((field, index) =>
      convertFieldToCamundaFormat(field, index)
    );

    // Tạo cấu trúc Camunda Form
    const camundaConfig = {
      components,
      type: "default",
      id: `Form_${generateId(0)}`,
      exporter: {
        name: "Camunda Modeler",
        version: "5.37.0",
      },
      executionPlatform: "Camunda Platform",
      executionPlatformVersion: "7.23.0",
      schemaVersion: 18,
    };

    // Chuyển đổi sang JSON
    const jsonString = JSON.stringify(camundaConfig, null, 2);

    // Tạo blob và tải xuống
    const blob = new Blob([jsonString], {
      type: "application/json;charset=utf-8",
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `camunda-form-${timestamp}.form`;

    saveAs(blob, fileName);
    message.success(`Đã tải xuống cấu hình Camunda Form: ${fileName}`);
  } catch (error) {
    console.error("Lỗi khi tải xuống:", error);
    message.error("Có lỗi xảy ra khi tải xuống cấu hình biểu mẫu");
  }
};
