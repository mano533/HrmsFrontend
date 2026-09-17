import { DownOutlined } from "@ant-design/icons";
import { Select, Empty } from "antd";

const SelectComponent = ({
  label = "",
  options = [],
  isMandatory = false,
  handleChange,
  placeholder = "select",
  name,
  value,
  isLabel = false,
  directionRow,
  width = "auto",
  height = 25,
  style,
  isError = "",
  errorMessage,
  className,
  labelStyle,
  variant,
  disabled = false,
  size = "",
  mode = "",
  prefixLabel = "",
  dropdownRender,
  onDropdownVisibleChange,
  open,
  filterOption,
  onSearch,
  defaultValue,
  isVisible = false
}) => {
  return (
    <>
      {!isVisible &&
        <div
          className={`flex ${directionRow ? "flex-row items-center gap-2" : "flex-col"
            } w-full`}
        >
          {isLabel == true ? (
            <div className="py-1">
              <label className="font-roboto text-xs" style={labelStyle}>
                {label}
                {isMandatory ? (
                  <span className="required-asterisk text-red-500">*</span>
                ) : (
                  <span></span>
                )}
              </label>
            </div>
          ) : (
            " "
          )}

          <Select
            showSearch
            open={open}
            onSearch={onSearch}
            filterOption={filterOption}
            onOpenChange={onDropdownVisibleChange}
            className={className}
            style={{ width: width, height: height, ...style }}
            placeholder={placeholder}
            defaultActiveFirstOption
            defaultValue={defaultValue}
            variant={variant}
            value={value}
            size={size}
            optionFilterProp="label"
            options={options}
            dropdownRender={dropdownRender}
            onChange={(value, data) =>
              handleChange({
                target: {
                  name: name,
                  value: value,
                  label: data?.label,
                  extraData: data,
                },
              })
            }
            notFoundContent={
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data" />
            }
            allowClear
            disabled={disabled}
            mode={mode}
            prefix={prefixLabel}
          />

          <div>
            {isError && (
              <div className="error-message font-roboto">
                <span className="text-xs text-red-500 font-roboto">
                  {errorMessage}
                </span>
              </div>
            )}
          </div>
        </div>}
    </>
  );
};

export default SelectComponent;
