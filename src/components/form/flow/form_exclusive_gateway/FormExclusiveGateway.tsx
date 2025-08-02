import { Button, Form } from "antd";
import { Controller, useForm } from "react-hook-form";
import type { CommonFormType } from "../../../../types/formFlow";
import type { FieldTypeFormExclusiveGateway } from "../../../../types/form/exclusiveGateWay.type";
import RadioGateway from "../../../common/radio/RadioGateway";
import FormOpenExclusiveGateway from "./FormOpenExclusiveGateway";
import FormCloseExclusiveGateway from "./FormCloseExclusiveGateway";

const FormExclusiveGateway = () => {
  const { handleSubmit, control, watch } = useForm<
    FieldTypeFormExclusiveGateway | CommonFormType
  >({
    defaultValues: {
      loaiExclusiveGateway: "open",
    },
  });
  const loaiExclusiveGateway = watch("loaiExclusiveGateway");

  const onSubmit = handleSubmit(
    (data: FieldTypeFormExclusiveGateway | CommonFormType) => {
      console.log({ data });
    }
  );

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item>
        <p className="bg-[#EFF0FA] px-3 py-2 w-full rounded-sm">
          Loại Đóng/ Mở của{" "}
          <span className="text-blue-500">Exclusive Gateway</span> không thể sửa
          sau khi tạo thành công
        </p>
      </Form.Item>

      <Form.Item>
        <Controller
          name="loaiExclusiveGateway"
          control={control}
          render={({ field }) => (
            <RadioGateway
              {...field}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      {loaiExclusiveGateway === "open" ? (
        <FormOpenExclusiveGateway control={control} />
      ) : (
        <FormCloseExclusiveGateway control={control} />
      )}

      <div className="flex-row-center justify-end">
        <Button type="text">Hủy</Button>
        <Button type="primary" htmlType="submit">
          Hoàn thành
        </Button>
      </div>
    </Form>
  );
};

export default FormExclusiveGateway;
