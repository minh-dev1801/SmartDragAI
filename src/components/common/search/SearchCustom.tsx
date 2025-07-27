import React from "react";
import { Input } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const SearchCustom: React.FC = () => (
  <Search placeholder="Tìm kiếm nhân viên" allowClear onSearch={onSearch} />
);

export default SearchCustom;
