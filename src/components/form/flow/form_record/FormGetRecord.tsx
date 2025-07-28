import { Button, Form, Input, Radio, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../../common/CustomSelection";

import CommonForm from "../CommonForm";
import type {
  CommonFormType,
  FieldTypeFormGetRecord,
} from "../../../../types/formFlow";

import { doiTuongData } from "../../../../constants/data/formGetRecord.data";
import TitleRequire from "../../../common/title_require/TitleRequire";
import { IoIosArrowForward } from "react-icons/io";

const FormGetRecord = () => {
  const { handleSubmit, control } = useForm<
    FieldTypeFormGetRecord | CommonFormType
  >({
    defaultValues: {
      luuBanGhiTimDuoc: "chi_ban_ghi_dau_tien",
    },
  });

  const onSubmit = handleSubmit(
    (data: FieldTypeFormGetRecord | CommonFormType) => {
      console.log({ data });
    }
  );

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <CommonForm control={control} />

      <Form.Item>
        <p className="bg-[#EFF0FA] px-3 py-2 w-full rounded-sm">
          Xác định đối tượng để truy xuất bản ghi từ hành động Get record.
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

      <Form.Item>
        <div className="flex items-center gap-2 border border-gray-300 rounded px-4 py-3">
          <span className="text-gray-600">
            <IoIosArrowForward />
          </span>
          <div className="text-sm font-medium text-gray-600">
            Điều kiện lọc bản ghi
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="flex items-center gap-2 border border-gray-300 rounded px-4 py-3">
          <span className="text-gray-600">
            <IoIosArrowForward />
          </span>
          <div className="text-sm font-medium text-gray-600">
            Sắp xếp danh sách bản ghi
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <p className="bg-[#EFF0FA] px-3 py-2 w-full rounded-sm">
          Xác định đối tượng để truy xuất bản ghi từ hành động Get record.
        </p>
      </Form.Item>

      <Form.Item>
        <TitleRequire text="Lưu bản ghi tìm được" />

        <Controller
          name="luuBanGhiTimDuoc"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field}>
              <div className="flex flex-col gap-2">
                <Radio value="chi_ban_ghi_dau_tien">Chỉ bản ghi đầu tiên</Radio>
                <Radio value="tat_ca_ban_ghi">Tất cả bản ghi</Radio>
              </div>
            </Radio.Group>
          )}
        />
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

      <div className="flex-row-center justify-end">
        <Button type="text">Hủy</Button>
        <Button type="primary" htmlType="submit">
          Hoàn thành
        </Button>
      </div>
    </Form>
  );
};

export default FormGetRecord;
