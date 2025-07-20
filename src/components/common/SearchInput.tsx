import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = ({ ...props }) => {
  return (
    <Input
      placeholder="Tìm kiếm"
      prefix={<SearchOutlined style={{ color: "gray" }} />}
      {...props}
    />
  );
};

export default SearchInput;
