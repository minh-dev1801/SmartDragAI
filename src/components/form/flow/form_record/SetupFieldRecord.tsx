import { Form, Input, Typography, Button } from "antd";
import { Controller, type Control } from "react-hook-form";

import type {
  CommonFormType,
  FieldTypeFormRecord,
} from "../../../../types/formFlow";
import TitleRequire from "../../../common/title_require/TitleRequire";
import CustomSelect from "../../../common/CustomSelection";
import { cachThietLapGiaTriChoTruongCuaBanGhiData } from "../../../../constants/data/formRecord.data";

interface FormUpdateRecordProps {
  control: Control<FieldTypeFormRecord | CommonFormType>;
}

const SetupFieldRecord = ({ control }: FormUpdateRecordProps) => {
  return (
    <div className="bg-[#F6F6FC] p-2 rounded">
      <Form.Item>
        <TitleRequire text="Cách thiết lập giá trị cho trường của bản ghi" />

        <Controller
          name="cachThietLapGiaTriChoTruongCuaBanGhi"
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              placeholder="Chọn đối tượng"
              value={field.value}
              onChange={field.onChange}
              options={cachThietLapGiaTriChoTruongCuaBanGhiData}
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Cấu hình giá trị của bản ghi
        </Typography.Title>
        <p className="text-gray-700 p-2 bg-[#EFF0FA] rounded">
          Thiết lập giá trị cho từng trường của bản ghi. Hãy gán giá trị cho các
          trường bắt buộc để đảm bảo tạo mới thành công.
        </p>
      </Form.Item>

      {/* <Form.Item label="Thiệt lập" style={{ marginBottom: "16px" }}>
        <Controller
          name="thietLap"
          control={control}
          defaultValue="ThietLapBanGhi" // Giá trị mặc định
          render={({ field }) => (
            <Radio.Group
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <Radio value="ThietLapBanGhi">Thiệt lập bản ghi</Radio>
              <Radio value="ThietLapGiaTri">Thiệt lập giá trị</Radio>
            </Radio.Group>
          )}
        />
      </Form.Item> */}

      <Form.Item>
        <Button variant="solid" color="primary">
          Thiết lập bản ghi
        </Button>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>Biến lưu bản ghi</Typography.Title>
        <div className="flex items-center">
          <Controller
            name="bienLuuBanGhi"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Chọn biến lưu bản ghi"
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
    </div>
  );
};

export default SetupFieldRecord;
