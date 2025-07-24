import { css } from "@emotion/css";
import { Dropdown } from "antd";
import { useState, type ReactNode } from "react";
import { FaCheck, FaChevronDown, FaRegTrashAlt } from "react-icons/fa";

interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

const positionItems = [
  { key: "nhansu", label: "Nhân sự", icon: <FaCheck /> },
  { key: "phong_ban", label: "Phòng ban", icon: <FaCheck /> },
  { key: "chuc_vu", label: "Chức vụ", icon: <FaCheck /> },
  { key: "trang_thai", label: "Trạng thái", icon: <FaCheck /> },
];

const conditionItems = [
  { key: "tat_ca_nhan_su", label: "Tất cả nhân sự", icon: <FaCheck /> },
  { key: "theo_ten", label: "Theo tên", icon: <FaCheck /> },
  { key: "theo_ma", label: "Theo mã", icon: <FaCheck /> },
  { key: "theo_email", label: "Theo email", icon: <FaCheck /> },
];

const valueItems = [
  { key: "tat_ca", label: "Tất cả", icon: <FaCheck /> },
  { key: "dang_lam_viec", label: "Đang làm việc", icon: <FaCheck /> },
  { key: "da_nghi_viec", label: "Đã nghỉ việc", icon: <FaCheck /> },
  { key: "thu_viec", label: "Thử việc", icon: <FaCheck /> },
];

const menu = (items: MenuItem[]) => {
  return {
    items: items.map((item) => ({
      key: item.key,
      label: (
        <div className="flex items-center justify-between w-full">
          <span>{item.label}</span>
          <span className="text-blue-500">{item.icon}</span>
        </div>
      ),
    })),
  };
};

interface FilterRowProps {
  onDelete: () => void;
  showDelete?: boolean;
}

const FilterRow = ({ onDelete, showDelete = true }: FilterRowProps) => {
  const [openDropDown, setOpenDropDown] = useState({
    position: false,
    condition: false,
    value: false,
  });

  const handleDropdownToggle = (dropdownName: string, isOpen: boolean) => {
    setOpenDropDown((prev) => {
      return {
        ...prev,
        [dropdownName]: isOpen,
      };
    });
  };

  const getDropdownClass = (isOpen: boolean) => {
    return css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      color: #4b5563;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid ${isOpen ? "#3b82f6" : "#d1d5db"};
    `;
  };

  return (
    <div className="flex items-center gap-3 mb-5">
      <Dropdown
        menu={menu(positionItems)}
        trigger={["click"]}
        className="flex-1"
        onOpenChange={(isOpen) => handleDropdownToggle("position", isOpen)}
      >
        <div className={getDropdownClass(openDropDown.position)}>
          Nhân sự
          <FaChevronDown className="text-gray-400" />
        </div>
      </Dropdown>

      <Dropdown
        menu={menu(conditionItems)}
        trigger={["click"]}
        className="flex-1"
        onOpenChange={(isOpen) => handleDropdownToggle("condition", isOpen)}
      >
        <div className={getDropdownClass(openDropDown.condition)}>
          Tất cả nhân sự
          <FaChevronDown className="text-gray-400" />
        </div>
      </Dropdown>

      <Dropdown
        menu={menu(valueItems)}
        trigger={["click"]}
        className="flex-1"
        onOpenChange={(isOpen) => handleDropdownToggle("value", isOpen)}
      >
        <div className={getDropdownClass(openDropDown.value)}>
          Tất cả nhân sự
          <FaChevronDown className="text-gray-400" />
        </div>
      </Dropdown>
      {showDelete && (
        <button
          onClick={onDelete}
          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <FaRegTrashAlt className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FilterRow;
