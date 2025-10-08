import { Form, Input, Divider, Typography } from "antd";

interface CommonFormProps {
  disabled?: boolean;
}

const CommonForm = ({ disabled }: CommonFormProps) => {
  console.log("CommonForm rendered with disabled:", disabled);

  return (
    <>
      <Form.Item
        name="name"
        label={
          <Typography.Title level={5}>
            Tên<span className="text-red-500">*</span>
          </Typography.Title>
        }
        rules={[{ required: true, message: "Vui lòng nhập tên" }]}
      >
        <Input placeholder="Nhập tên" disabled={disabled} />
      </Form.Item>

      <Form.Item
        name="slug"
        label={
          <Typography.Title level={5}>
            Slug<span className="text-red-500">*</span>
          </Typography.Title>
        }
        rules={[{ required: true, message: "Vui lòng nhập slug" }]}
      >
        <Input placeholder="Nhập slug" disabled={disabled} />
      </Form.Item>

      <Form.Item
        name="description"
        label={<Typography.Title level={5}>Mô tả</Typography.Title>}
      >
        <Input.TextArea
          placeholder="Nhập mô tả hành động"
          rows={3}
          disabled={disabled}
        />
      </Form.Item>
      <Divider />
    </>
  );
};

export default CommonForm;
