import { Button, Form, Input, Radio, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import CommonForm from "./CommonForm";
import type {
  CommonFormType,
  FieldTypeFormLoop,
} from "../../../types/formFlow";

const FormLoop = () => {
  const { handleSubmit, control } = useForm<FieldTypeFormLoop | CommonFormType>(
    {
      defaultValues: {
        huongLap: "tu_ban_ghi_dau_den_ban_ghi_cuoi",
      },
    }
  );

  const onSubmit = handleSubmit((data: FieldTypeFormLoop | CommonFormType) => {
    console.log({ data });
  });

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <CommonForm control={control} />

      <Form.Item>
        <Typography.Title level={5}>
          Danh sách cần lặp<span className="text-red-500">*</span>
        </Typography.Title>

        <div className="flex items-center">
          <Controller
            name="danhSachCanLap"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Chọn danh sách cần lặp"
                className="flex-1"
              />
            )}
          />
          <div className="bg-gray-200 rounded-[2px] py-[2px]  px-3 cursor-pointer hover:bg-gray-300">
            <span className="text-blue-500 text-lg mr-1 font-bold">{"{"}</span>
            <span className="text-blue-300 text-lg font-bold">{"}"}</span>
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Hướng lặp<span className="text-red-500">*</span>
        </Typography.Title>

        <Controller
          name="huongLap"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field}>
              <div className="flex flex-col gap-2">
                <Radio value="tu_ban_ghi_dau_den_ban_ghi_cuoi">
                  Từ bản ghi đầu đến bản ghi cuối
                </Radio>
                <Radio value="tu_ban_ghi_cuoi_toi_ban_ghi_dau">
                  Từ bản ghi cuối tới bản ghi đầu
                </Radio>
              </div>
            </Radio.Group>
          )}
        />
      </Form.Item>

      <div className="flex-row-center justify-end">
        <Button type="text">Hủy</Button>
        <Button type="primary" htmlType="submit">
          Hoàn thành
        </Button>
      </div>
    </Form>
  );
};

export default FormLoop;
