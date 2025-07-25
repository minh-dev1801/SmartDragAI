import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  InputNumber,
  Typography,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../common/CustomSelection";
import CommonForm from "./CommonForm";
import type {
  CommonFormType,
  FieldTypeFormSendHTTPRequest,
} from "../../../types/formFlow";
import {
  httpMethodData,
  parseResponseData,
} from "../../../constants/data/formHTTPRequest.data";

const FormSendHTTPRequest = () => {
  const { handleSubmit, control } = useForm<
    FieldTypeFormSendHTTPRequest | CommonFormType
  >({
    defaultValues: {
      httpMethod: "post",
      parseResponse: "parse_response_thanh_json",
    },
  });

  const onSubmit = handleSubmit(
    (data: FieldTypeFormSendHTTPRequest | CommonFormType) => {
      console.log({ data });
    }
  );

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <CommonForm control={control} />

      <Typography.Title level={4}>Cấu hình HTTP Request</Typography.Title>

      <Form.Item>
        <Typography.Title level={5}>
          Request URL<span className="text-red-500">*</span>
        </Typography.Title>
        <div className="flex items-center">
          <Controller
            name="cauHinhRequest"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập request url"
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
          HTTP method<span className="text-red-500">*</span>
        </Typography.Title>

        <Flex>
          <Controller
            name="httpMethod"
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
        <Flex gap={15}>
          <div className="flex-2">
            <Typography.Title level={5}>
              Parse response
              <span className="text-red-500">*</span>
            </Typography.Title>
            <Controller
              name="parseResponse"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={field.value}
                  className="flex-1"
                  onChange={field.onChange}
                  options={parseResponseData}
                />
              )}
            />
          </div>

          <div className="flex-1">
            <Typography.Title level={5}>Timeout (s)</Typography.Title>
            <Controller
              name="timeOut"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  defaultValue={10}
                  min={0}
                  max={100}
                  style={{ width: "100%" }}
                />
              )}
            />
          </div>

          <div className="flex-1">
            <Typography.Title level={5}>Số lần retry</Typography.Title>
            <Controller
              name="soLanRetry"
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  defaultValue={10}
                  min={0}
                  max={100}
                  style={{ width: "100%" }}
                />
              )}
            />
          </div>
        </Flex>
      </Form.Item>

      <div>
        <Controller
          name="choNhanPhanHoi"
          control={control}
          render={({ field }) => (
            <Checkbox {...field}>Chờ cho đến khi nhận được phản hồi</Checkbox>
          )}
        />
      </div>
      <div className="my-4">
        <Controller
          name="tiepTucKhiRequestLoi"
          control={control}
          render={({ field }) => (
            <Checkbox {...field}>
              Tiếp tục quy trình kể cả khi request trả về lỗi (non-2xx/3xx
              response)
            </Checkbox>
          )}
        />
      </div>

      <Button type="primary" variant="outlined">
        Cấu hình response mẫu
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

export default FormSendHTTPRequest;
