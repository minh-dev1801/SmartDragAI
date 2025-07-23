import { Button, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";

type FieldType = {
  email?: string;
  password?: string;
};

const FormUserTask = () => {
  const { handleSubmit, control } = useForm<FieldType>();

  const onSubmit = handleSubmit((data: FieldType) => {
    console.log({ data });
  });

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item label="Email">
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input.Password {...field} />}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormUserTask;
