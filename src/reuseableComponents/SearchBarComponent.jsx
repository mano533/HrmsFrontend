import React, { forwardRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBarComponent = forwardRef(({
  onChange,
  size = "small",
  className,
  value,
  placeholder,
  style,
  isSearchLabel = false,
  suffix = "",
  isDisabled = false
}, ref) => {

  if (!isSearchLabel) {
    return (
      <Input
        allowClear
        onChange={onChange}
        size={size}
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        style={style}
        className={className}
        value={value}
        ref={ref}
        suffix={suffix}
        disabled={isDisabled}
      />
    );
  }

  return (
    <div className="flex flex-col">
      <label className="font-roboto text-xs font-semibold mb-1">
        Search
      </label>
      <Input
        allowClear
        onChange={onChange}
        size={size}
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        style={style}
        className={className}
        value={value}
        ref={ref}
      />
    </div>
  );
});

export default SearchBarComponent;