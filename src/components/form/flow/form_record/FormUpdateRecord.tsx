import { Checkbox, Form, Typography } from "antd";
import { Controller, type Control } from "react-hook-form";
import CustomSelect from "../../../common/CustomSelection";
import CommonForm from "../CommonForm";
import type {
  CommonFormType,
  FieldTypeFormRecord,
} from "../../../../types/formFlow";
import { doiTuongData } from "../../../../constants/data/formRecord.data";
import SetupFieldRecord from "./SetupFieldRecord";

interface FormUpdateRecordProps {
  control: Control<FieldTypeFormRecord | CommonFormType>;
}

const FormUpdateRecord = ({ control }: FormUpdateRecordProps) => {
  return (
    <>
      <CommonForm control={control} />

      <Form.Item>
        <Typography.Title level={4}>
          Cách thiết lập giá trị của bản ghi
        </Typography.Title>
        <p className="bg-[#EFF0FA] px-3 py-2 w-full rounded-sm">
          Chọn cách thiết lập giá trị cho bản ghi, đối tượng cập nhật bản ghi và
          bản ghi sẽ cập nhật.
        </p>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Đối tượng<span className="text-red-500">*</span>
        </Typography.Title>

        <Controller
          name="doiTuong"
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              placeholder="Chọn đối tượng"
              value={field.value}
              onChange={field.onChange}
              options={doiTuongData}
            />
          )}
        />
      </Form.Item>

      <SetupFieldRecord control={control} />

      <Form.Item>
        <Controller
          name="xuLyBanGhiTrungLap"
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              onChange={field.onChange}
            >
              Xử lý bản ghi trùng lặp
            </Checkbox>
          )}
        />
      </Form.Item>
    </>
  );
};

export default FormUpdateRecord;
