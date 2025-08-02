import { Button, Form } from "antd";
import { Controller, useForm } from "react-hook-form";
import type {
  CommonFormType,
  FieldTypeFormRecord,
} from "../../../../types/formFlow";
import RadioCustom from "../../../common/radio/RadioCustom";
import FormUpdateRecord from "./FormUpdateRecord";
import FormCreateRecord from "./FormCreateRecord";

const FormRecord = () => {
  const { handleSubmit, control, watch } = useForm<
    FieldTypeFormRecord | CommonFormType
  >({
    defaultValues: {
      loaiQuyTrinh: "create",
      cachThietLapGiaTriChoTruongCuaBanGhi:
        "tu_chon_hoac_nhap_gia_tri_cho_cac_truong",
    },
  });
  const loaiQuyTrinh = watch("loaiQuyTrinh");

  const onSubmit = handleSubmit(
    (data: FieldTypeFormRecord | CommonFormType) => {
      console.log({ data });
    }
  );

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item>
        <Controller
          name="loaiQuyTrinh"
          control={control}
          render={({ field }) => (
            <RadioCustom
              {...field}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      {loaiQuyTrinh === "update" ? (
        <FormUpdateRecord control={control} />
      ) : (
        <FormCreateRecord control={control} />
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

export default FormRecord;
