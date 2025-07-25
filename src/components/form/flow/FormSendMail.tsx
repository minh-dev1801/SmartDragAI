import { Button, Flex, Form, Input, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../common/CustomSelection";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
import CommonForm from "./CommonForm";
import type {
  CommonFormType,
  FieldTypeFormSendMail,
} from "../../../types/formFlow";
import {
  optionLoaiEmail,
  optionLoaiVanBan,
  optionNoiDungEmail,
  regularSelectOptions,
} from "../../../constants/data/formData";

const FormSendMail = () => {
  const { handleSubmit, control } = useForm<
    FieldTypeFormSendMail | CommonFormType
  >({
    defaultValues: {
      loaiEmail: "nhan_su",
      loaiVanBan: "van_ban_co_dinh_dang",
      noiDungEmail: "nhap_noi_dung_thu_cong",
    },
  });

  const onSubmit = handleSubmit(
    (data: FieldTypeFormSendMail | CommonFormType) => {
      console.log({ data });
    }
  );

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <CommonForm control={control} />

      <Form.Item>
        <Typography.Title level={5}>Cấu hình email</Typography.Title>
        <Controller
          name="cauHinhEmail"
          control={control}
          render={({ field }) => (
            <Flex gap="small" {...field}>
              <Button variant="text" color="primary">
                To
              </Button>
              <Button variant="text" color="primary">
                Cc
              </Button>
              <Button variant="text" color="primary">
                Bcc
              </Button>
              <Button variant="text" color="primary">
                Reply-to
              </Button>
            </Flex>
          )}
        />
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          From<span className="text-red-500">*</span>
        </Typography.Title>
        <Flex gap="middle">
          <Controller
            name="loaiEmail"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={optionLoaiEmail}
              />
            )}
          />

          <Controller
            name="emailNguoiDung"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="flex-1"
                onChange={field.onChange}
                options={regularSelectOptions}
              />
            )}
          />
        </Flex>

        <div className="flex items-center justify-end mt-[2px]">
          <Button variant="text" color="primary">
            Tạo Workspace email
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          To<span className="text-red-500">*</span>
        </Typography.Title>

        <div className="flex items-center">
          <Controller
            name="emailNguoiNhan"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập email người nhận"
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
          Tiêu đề email<span className="text-red-500">*</span>
        </Typography.Title>

        <div className="flex items-center">
          <Controller
            name="tieuDeEmail"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập tiêu đề email"
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
          Loại văn bản<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex>
          <Controller
            name="loaiVanBan"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={optionLoaiVanBan}
              />
            )}
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Nội dung email<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex>
          <Controller
            name="noiDungEmail"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={optionNoiDungEmail}
              />
            )}
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <Controller
          name="noiDungVanBan"
          control={control}
          render={({ field }) => <RichTextEditor {...field} />}
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

export default FormSendMail;
