import { Form, Input, Divider, Typography } from "antd";
import { Controller, type Control } from "react-hook-form";
import type { CommonFormType } from "../../../types/formFlow";

interface BasicInfoFieldsProps {
  control: Control<CommonFormType>;
}

const CommonForm = ({ control }: BasicInfoFieldsProps) => {
  return (
    <>
      <Form.Item>
        <Typography.Title level={5}>
          Tên<span className="text-red-500">*</span>
        </Typography.Title>

        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Nhập tên" />}
        />
      </Form.Item>
      <Form.Item>
        <Typography.Title level={5}>
          Slug<span className="text-red-500">*</span>
        </Typography.Title>

        <Controller
          name="slug"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Nhập slug" />}
        />
      </Form.Item>
      <Form.Item>
        <Typography.Title level={5}>Mô tả</Typography.Title>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input.TextArea {...field} placeholder="Nhập mô tả hành động" />
          )}
        />
      </Form.Item>
      <Divider />
    </>
  );
};

export default CommonForm;
