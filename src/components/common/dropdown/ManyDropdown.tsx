import React from "react";
import { Divider, Select } from "antd";
import SearchCustom from "../search/SearchCustom";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ManyDropdownProps {
  value: string[];
  options: Option[];
  onChange: (value: string[]) => void;
  className?: string;
  placeholder?: string;
}

const ManyDropdown: React.FC<ManyDropdownProps> = ({
  value,
  options,
  onChange,
  className,
  placeholder,
}) => (
  <Select
    value={value}
    onChange={onChange}
    className={className}
    placeholder={placeholder}
    style={{ width: "100%" }}
    options={options}
    popupRender={(menu) => (
      <>
        <SearchCustom />
        <Divider style={{ margin: "10px 0" }} />
        {menu}
      </>
    )}
  />
);

export default ManyDropdown;
