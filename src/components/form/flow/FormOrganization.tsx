import { Button, Flex, Form, Input, Radio, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../common/CustomSelection";
import CommonForm from "./CommonForm";
import { httpMethodData } from "../../../constants/data/formHTTPRequest.data";
import HRFilter from "../../query-builder/HRFilter";
import { tenTruongData } from "../../../constants/data/formOrganization.data";
import type {
  CommonFormType,
  FieldTypeFormOrganization,
} from "../../../types/formFlow";

const FormOrganization = () => {
  const { handleSubmit, control } = useForm<
    FieldTypeFormOrganization | CommonFormType
  >({
    defaultValues: {
      tenTruong: "",
      luuDuLieuTimDuoc: "1",
    },
  });

  const onSubmit = handleSubmit(
    (data: FieldTypeFormOrganization | CommonFormType) => {
      console.log({ data });
    }
  );

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <CommonForm control={control} />

      <Typography.Title level={4}>Thiết lập dữ liệu đầu ra</Typography.Title>

      <Form.Item>
        <Typography.Title level={5}>Kiểu dữ liệu đầu ra</Typography.Title>
        <Flex>
          <Controller
            name="kieuDuLieuDauRa"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={httpMethodData}
              />
            )}
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <HRFilter />
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>Lưu dữ liệu tìm được</Typography.Title>

        <Flex>
          <Controller
            name="luuDuLieuTimDuoc"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Flex vertical gap={10}>
                  <Radio value={"1"}>
                    Lưu trữ một trường của bản ghi đầu tiên
                  </Radio>
                  <Radio value={"2"}>
                    Lưu trữ một trường của danh sách bản ghi
                  </Radio>
                </Flex>
              </Radio.Group>
            )}
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <Flex gap={15}>
          <div className="flex-1">
            <Controller
              name="tenTruong"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={field.value}
                  className="flex-1"
                  onChange={field.onChange}
                  options={tenTruongData}
                />
              )}
            />
          </div>

          <div className="flex items-center flex-1">
            <Controller
              name="tenBien"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Chọn biến" className="flex-1" />
              )}
            />
            <div className="bg-gray-200 rounded-[2px] py-[2px]  px-3 cursor-pointer hover:bg-gray-300">
              <span className="text-blue-500 text-lg mr-1 font-bold">
                {"{"}
              </span>
              <span className="text-blue-300 text-lg font-bold">{"}"}</span>
            </div>
          </div>
        </Flex>
      </Form.Item>

      <Button type="default" variant="filled">
        Thêm
      </Button>

      <div className="flex-row-center justify-end">
        <Button type="text">Hủy</Button>
        <Button type="primary" htmlType="submit">
          Hoàn thành
        </Button>
      </div>
    </Form>
  );
};

export default FormOrganization;
