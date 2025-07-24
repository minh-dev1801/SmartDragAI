import { Button } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import FilterGroup from "./FilterGroup";

const HRFilter = () => {
  const [filterGroups, setFilterGroups] = useState([{}]);

  const addFilterGroup = () => {
    setFilterGroups([...filterGroups, {}]);
  };

  // const removeFilterGroup = (index: number) => {
  //   if (filterGroups.length > 1) {
  //     setFilterGroups(filterGroups.filter((_, i) => i !== index));
  //   }
  // };

  return (
    <>
      <div className="border border-gray-200 p-1 rounded-lg pt-4 pb-2 px-4">
        <div className="bg-gray-100 flex py-2 pl-10">
          <p className="text-gray-500 font-500 text-sm text-start flex-1">
            Loại điều kiện
          </p>
          <p className="text-gray-500 font-500 text-sm text-start flex-1">
            Điều kiện
          </p>
          <p className="text-gray-500 font-500 text-sm text-start flex-1">
            Giá trị
          </p>
        </div>
        {filterGroups.map((_, groupIndex) => (
          <div key={groupIndex}>
            {groupIndex > 0 && (
              <div className="flex items-center justify-center mb-4">
                <span className="text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full border-2 border-gray-200">
                  OR
                </span>
              </div>
            )}
            <FilterGroup />
          </div>
        ))}
      </div>
      <Button onClick={addFilterGroup} type="primary" className="mb-4 mt-2">
        <FaPlus className="w-4 h-4" />
        Thêm tập điều kiện
      </Button>
    </>
  );
};

export default HRFilter;
