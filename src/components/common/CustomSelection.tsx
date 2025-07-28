import { Select } from "antd";
import { FaCheck } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const CustomSelect = ({
  value,
  options,
  onChange,
  className,
  placeholder,
}: CustomSelectProps) => {
  console.log({ placeholder });
  return (
    <Select
      value={value}
      className={className}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      optionRender={(option) => (
        <div className="flex items-center justify-between w-full">
          <span>{option.label}</span>
          {value === option.value && (
            <FaCheck className="text-blue-500 text-sm" />
          )}
        </div>
      )}
    />
  );
};

export default CustomSelect;
