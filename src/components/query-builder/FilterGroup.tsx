import { Button } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import FilterRow from "./FilterRow";

const FilterGroup = () => {
  const [filters, setFilters] = useState([{}]);

  const addFilter = () => {
    setFilters([...filters, {}]);
  };

  const removeFilter = (index: number) => {
    if (filters.length > 1) {
      setFilters(filters.filter((_, i) => i !== index));
    }
  };

  return (
    <div className=" p-2">
      {filters.map((_, index) => (
        <div key={index}>
          {index > 0 && (
            <div className="flex items-center mb-3">
              <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full border">
                AND
              </span>
            </div>
          )}
          <FilterRow
            onDelete={() => removeFilter(index)}
            showDelete={filters.length > 1}
          />
        </div>
      ))}

      <Button onClick={addFilter} type="primary">
        <FaPlus className="text-[14px]" />
        Thêm điều kiện
      </Button>
    </div>
  );
};

export default FilterGroup;
