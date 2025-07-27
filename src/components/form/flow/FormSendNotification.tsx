import { Button, Flex, Form, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../common/CustomSelection";
import CommonForm from "./CommonForm";
import type {
  CommonFormType,
  FieldTypeFormSendNotification,
} from "../../../types/formFlow";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
import ManyDropdown from "../../common/dropdown/ManyDropdown";
import {
  kieuDinhHuongData,
  kieuThongBaoData,
  loaiBoNguoiData,
  loaiNguoiGuiData,
  loaiThongBaoData,
  loaiVanBanData,
  nguoiGuiData,
  nguoiNhanData,
  noiDungThongBaoData,
} from "../../../constants/data/formSendNotification";

const FormSendNotification = () => {
  const { handleSubmit, control } = useForm<
    FieldTypeFormSendNotification | CommonFormType
  >({
    defaultValues: {
      nguoiGui: "nhan_su",
      kieuThongBao: "don_gian",
      loaiVanBan: "van_ban_co_dinh_dang",
      noiDungThongBao: "nhap_noi_dung_thu_cong",
      kieuDinhHuong: "chuyen_huong_toi_url",
    },
  });

  const onSubmit = handleSubmit(
    (data: FieldTypeFormSendNotification | CommonFormType) => {
      console.log({ data });
    }
  );

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <CommonForm control={control} />

      <Form.Item>
        <Typography.Title level={4}>Cấu hình thông báo</Typography.Title>
        <Typography.Text>
          Sử dụng các giá trị từ các bước trước để thiết lập đầu vào cho hành
          động gửi thông báo. Để sử dụng kết quả của hành động này ở các bước
          sau, lưu chúng vào các biến.
        </Typography.Text>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Loại thông báo<span className="text-red-500">*</span>
        </Typography.Title>

        <Controller
          name="loaiThongBao"
          control={control}
          render={({ field }) => (
            <ManyDropdown
              {...field}
              value={field.value}
              placeholder="Chọn loại thông báo"
              onChange={field.onChange}
              options={loaiThongBaoData}
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Người gửi<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex gap="middle">
          <div className="flex-1">
            <Controller
              name="loaiNguoiGui"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  options={loaiNguoiGuiData}
                />
              )}
            />
          </div>

          <div className="flex items-center flex-1">
            <Controller
              name="nguoiGui"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={field.value}
                  className="flex-1"
                  onChange={field.onChange}
                  options={nguoiGuiData}
                />
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

      <Form.Item>
        <Typography.Title level={5}>
          Người nhận<span className="text-red-500">*</span>
        </Typography.Title>

        <div className="flex items-center">
          <Controller
            name="nguoiNhan"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={nguoiNhanData}
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
          Loại bỏ những người này ra khỏi danh sách nhận thông báo
        </Typography.Title>

        <div className="flex items-center">
          <Controller
            name="loaiBoNguoi"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={loaiBoNguoiData}
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
          Kiểu thông báo<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex gap="middle">
          <Controller
            name="kieuThongBao"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={kieuThongBaoData}
              />
            )}
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Tiêu đề thông báo<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex gap="middle">
          <Controller
            name="tieuDeThongBao"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập tiêu đề thông báo"
                className="flex-1"
              />
            )}
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Loại văn bản<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex gap="middle">
          <Controller
            name="loaiVanBan"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={loaiVanBanData}
              />
            )}
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>
          Nội dung thông báo<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex gap="middle">
          <Controller
            name="noiDungThongBao"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={noiDungThongBaoData}
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

      <Form.Item>
        <Typography.Title level={5}>
          Kiểu điều hướng<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex gap="middle">
          <Controller
            name="kieuDinhHuong"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                value={field.value}
                className="flex-1"
                onChange={field.onChange}
                options={kieuDinhHuongData}
              />
            )}
          />
        </Flex>
      </Form.Item>

      <Form.Item>
        <Typography.Title level={5}>Trang chi tiết điều hướng</Typography.Title>

        <div className="flex items-center">
          <Controller
            name="trangChiTietDieuHuong"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập tiêu đề thông báo"
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

export default FormSendNotification;
