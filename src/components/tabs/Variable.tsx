import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Variable: React.FC = () => {
  return (
    <div>
      <Input
        placeholder="Tìm kiếm"
        prefix={<SearchOutlined style={{ color: "gray" }} />}
      />
     
    </div>
  );
};

export default Variable;
