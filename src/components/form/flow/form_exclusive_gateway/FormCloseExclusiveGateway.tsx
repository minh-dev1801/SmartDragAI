// FormCloseExclusiveGateway.tsx
import { Divider, Typography } from "antd";
import CommonForm from "../CommonForm";

const FormCloseExclusiveGateway = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Typography.Title level={3} className="mb-6">
        Cấu hình Exclusive Gateway (Đóng)
      </Typography.Title>

      <CommonForm />

      <Divider />
    </div>
  );
};

export default FormCloseExclusiveGateway;
