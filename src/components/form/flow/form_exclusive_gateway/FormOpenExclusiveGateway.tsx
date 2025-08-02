import { Button, Form, Typography } from "antd";
import { type Control } from "react-hook-form";
import CommonForm from "../CommonForm";
import type { CommonFormType } from "../../../../types/formFlow";
import type { FieldTypeFormExclusiveGateway } from "../../../../types/form/exclusiveGateWay.type";
import { BiPlus } from "react-icons/bi";

interface FormOpenExclusiveGatewayProps {
  control: Control<FieldTypeFormExclusiveGateway | CommonFormType>;
}

const FormOpenExclusiveGateway = ({
  control,
}: FormOpenExclusiveGatewayProps) => {
  return (
    <>
      <CommonForm control={control} />

      <Form.Item>
        <Typography.Title level={5}>Thiết lập nhánh</Typography.Title>
        <p className="text-gray-600">
          Đối với mỗi nhánh, hãy chỉ định các điều kiện phải đáp ứng để luồng đi
          theo hướng đó. Workflow kiểm tra từ trên xuống và thực thi nhánh đầu
          tiên có điều kiện được đáp ứng.
        </p>
      </Form.Item>

      <Form.Item>
        <Button size="large" color="default" variant="filled" icon={<BiPlus />}>
          Thêm nhánh
        </Button>
      </Form.Item>
    </>
  );
};

export default FormOpenExclusiveGateway;
