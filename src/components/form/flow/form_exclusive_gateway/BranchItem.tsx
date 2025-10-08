import { Button, Form, Input, Typography } from "antd";
import { BiTrash } from "react-icons/bi";

interface BranchItemProps {
  onRemove: () => void;
  showRemove: boolean;
  name: number;
}

const BranchItem = ({ onRemove, showRemove, name }: BranchItemProps) => {
  console.log(`Rendering BranchItem ${name + 1}`);

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <Typography.Text strong>Nhánh {name + 1}</Typography.Text>
        {showRemove && (
          <Button
            type="text"
            danger
            icon={<BiTrash />}
            onClick={() => {
              console.log(`Removing branch at name ${name}`);
              onRemove();
            }}
            size="small"
          >
            Xóa
          </Button>
        )}
      </div>

      <Form.Item
        name={[name, "name"]}
        label={
          <Typography.Text>
            Tên nhánh<span className="text-red-500">*</span>
          </Typography.Text>
        }
        rules={[{ required: true, message: "Vui lòng nhập tên nhánh" }]}
      >
        <Input placeholder="Nhập tên nhánh" className="mt-2" />
      </Form.Item>

      <Form.Item
        name={[name, "conditions"]}
        label={
          <Typography.Text>
            Điều kiện<span className="text-red-500">*</span>
          </Typography.Text>
        }
        rules={[{ required: true, message: "Vui lòng nhập điều kiện" }]}
      >
        <Input.TextArea
          placeholder="Ví dụ: status == 'approved'"
          rows={2}
          className="mt-2"
        />
      </Form.Item>
    </div>
  );
};

export default BranchItem;
