import { Button, Form } from "antd";
import RadioGateway from "../../../common/radio/RadioGateway";
import FormOpenExclusiveGateway from "./FormOpenExclusiveGateway";
import FormCloseExclusiveGateway from "./FormCloseExclusiveGateway";
import type { FieldTypeFormExclusiveGateway } from "../../../../types/form/exclusiveGateway.type";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../../../redux/store/store";
import { setFormData } from "../../../../redux/features/formExclusiveGateway/formExclusiveGatewaySlice";

const FormExclusiveGateway = () => {
  const [form] = Form.useForm<FieldTypeFormExclusiveGateway>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldTypeFormExclusiveGateway) => {
    console.log("Submitting form with data:", JSON.stringify(data, null, 2));
    dispatch(setFormData(data as any));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        loaiExclusiveGateway: "open",
        name: "",
        slug: "",
        description: "",
        branches: [{ id: uuidv4(), name: "", conditions: "" }],
      }}
    >
      <Form.Item>
        <p className="bg-[#EFF0FA] px-3 py-2 w-full rounded-sm">
          Loại Đóng/ Mở của{" "}
          <span className="text-blue-500">Exclusive Gateway</span> không thể sửa
          sau khi tạo thành công
        </p>
      </Form.Item>

      <Form.Item
        name="loaiExclusiveGateway"
        rules={[
          { required: true, message: "Vui lòng chọn loại Exclusive Gateway" },
        ]}
      >
        <RadioGateway />
      </Form.Item>

      <Form.Item
        shouldUpdate={(prev, curr) =>
          prev.loaiExclusiveGateway !== curr.loaiExclusiveGateway
        }
      >
        {({ getFieldValue }) => {
          const gatewayType = getFieldValue("loaiExclusiveGateway");
          console.log("Rendering gateway form for type:", gatewayType);
          return gatewayType === "open" ? (
            <FormOpenExclusiveGateway />
          ) : (
            <FormCloseExclusiveGateway />
          );
        }}
      </Form.Item>

      <Form.Item>
        <div className="flex-row-center justify-end">
          <Button
            type="text"
            onClick={() => {
              console.log("Cancel button clicked");
              form.resetFields();
              console.log("Form reset");
            }}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => console.log("Submit button clicked")}
          >
            Hoàn thành
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default FormExclusiveGateway;
