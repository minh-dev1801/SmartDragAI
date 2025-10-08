import { Button, Divider, Form, Typography } from "antd";
import { BiPlus } from "react-icons/bi";
import CommonForm from "../CommonForm";
import BranchItem from "./BranchItem";
import { v4 as uuidv4 } from "uuid";

const FormOpenExclusiveGateway = () => {
  console.log("Rendering FormOpenExclusiveGateway");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Typography.Title level={3} className="mb-6">
        Cấu hình Exclusive Gateway
      </Typography.Title>

      <CommonForm />

      <Form.Item>
        <Typography.Title level={5}>Thiết lập nhánh</Typography.Title>
        <p className="text-gray-600">
          Đối với mỗi nhánh, hãy chỉ định các điều kiện phải đáp ứng để luồng đi
          theo hướng đó. Workflow kiểm tra từ trên xuống và thực thi nhánh đầu
          tiên có điều kiện được đáp ứng.
        </p>
      </Form.Item>

      <Form.List name="branches">
        {(fields, { add, remove }) => {
          console.log(`Rendering Form.List with ${fields.length} branches`);

          return (
            <>
              {fields.map((field) => {
                console.log("field", field);
                return (
                  <BranchItem
                    key={field.key}
                    onRemove={() => {
                      console.log(`Removing branch at index ${field.name}`);
                      remove(field.name);
                    }}
                    showRemove={fields.length > 1}
                    name={field.name}
                  />
                );
              })}
              <Form.Item>
                <Button
                  size="large"
                  type="dashed"
                  onClick={() => {
                    const newBranch = {
                      id: uuidv4(),
                      name: "",
                      conditions: "",
                    };
                    console.log("Adding new branch:", newBranch);
                    add(newBranch);
                  }}
                  icon={<BiPlus />}
                  block
                >
                  Thêm nhánh
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>

      <Divider />
    </div>
  );
};

export default FormOpenExclusiveGateway;
