import CommonForm from "../CommonForm";
import type { CommonFormType } from "../../../../types/formFlow";
import type { Control } from "react-hook-form";

interface FormCloseExclusiveGatewayProps {
  control: Control<CommonFormType>;
}

const FormCloseExclusiveGateway = ({
  control,
}: FormCloseExclusiveGatewayProps) => {
  return (
    <>
      <CommonForm control={control} />
    </>
  );
};

export default FormCloseExclusiveGateway;
