import { Button, Checkbox, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import HRFilterUI from "../../query-builder/HRFilter";

type FieldType = {
  name: string;
  slug: string;
  description: string;
  personnel: string;
  canViewProgress: string;
  canViewProgressAndSteps: string;
  processingDeadline: string;
};

const FormUserTask = () => {
  const { handleSubmit, control } = useForm<FieldType>();

  const onSubmit = handleSubmit((data: FieldType) => {
    console.log({ data });
  });

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item label="Tên task" required>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Slug" required>
        <Controller
          name="slug"
          control={control}
          render={({ field }) => <Input.Password {...field} />}
        />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>
      <Form.Item label="Nhân sự thực hiện" required>
        <Controller
          name="personnel"
          control={control}
          render={({ field }) => <Input.TextArea {...field} />}
        />
      </Form.Item>

      <HRFilterUI />

      <div>
        <Controller
          name="canViewProgress"
          control={control}
          render={({ field }) => (
            <Checkbox {...field}>
              Cho phép người thực hiện bước này có thể xem tiến trình lượt chạy
            </Checkbox>
          )}
        />
      </div>
      <div className="my-4">
        <Controller
          name="canViewProgress"
          control={control}
          render={({ field }) => (
            <Checkbox {...field}>
              Cho phép người thực hiện bước này có thể xem tiến trình và các
              bước khác
            </Checkbox>
          )}
        />
      </div>
      <div>
        <Controller
          name="processingDeadline"
          control={control}
          render={({ field }) => <Checkbox {...field}>Thời hạn xử lý</Checkbox>}
        />
      </div>
      <div className="flex-row-center justify-end">
        <Button type="text">Hủy</Button>
        <Button type="primary" htmlType="submit">
          Hoàn thành
        </Button>
      </div>
    </Form>
  );
};

export default FormUserTask;
