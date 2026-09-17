import React from "react";
import {
  Checkbox,
  ConfigProvider,
  Input,
  Space,
  Upload,
  DatePicker,
  Button,
  InputNumber,
  Radio,
  TimePicker,
} from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
const { Search, Password, TextArea } = Input;
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const InputComponent = ({
  ref,
  label,
  placeholder = "",
  name = "",
  value = "",
  type = "text",
  onChange = () => { },
  isMandatory = false,
  isLabel = false,
  style,
  className,
  colorBgContainer = false,
  children,
  labelStyle,
  prefix,
  suffix,
  allowClear = true,
  size = "middle",
  disabled = false,
  rows = 4,
  options = [],
  directionRow,
  isDisabled,
  isError = "",
  errorMessage,
  checked,
  addonBefore,
  showTime = false,
  showUploadList = false,
  locale,
  defaultValue,
  beforeUpload,
  minDate = "",
  maxDate = "",
  CheckboxLabel,
  indeterminate,
  maxLength,
  max,
  hideSearchBar,
  hideOptionCount,
  disabledDate,
  popupClassName = false,
  allowNegative = true, //  allowNegative = true allows negative numbers
  optionList = [], // Radio button list
  radioButtonCenter,
  radioButtonDirection = "horizontal",
  step,
  directValue = false,
  BesideLabelExtraAction = null,
  ishidden,
  dateFormatRange = "YYYY-MM-DD"
}) => {
  dayjs.extend(customParseFormat);
  const dateFormat = dateFormatRange;
  const timeFormat = "HH:mm";

  // allowed key for Inputnumber
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "End",
    "Home",
  ];

  const renderFormFields = () => {
    const commonProps = {
      className,
      placeholder,
      name,
      style,
      allowClear,
      prefix,
      suffix,
      size,
      disabled,
      minDate,
      maxDate,
      maxLength,
      ishidden,
      rows,
      ref,
    };

    switch (type) {
      case "text":
        return (
          <Input
            {...commonProps}
            value={value}
            onChange={onChange}
            hidden={ishidden}
          />
        );
      case "email":
        return (
          <Input
            {...commonProps}
            type="email"
            value={value}
            onChange={onChange}
            autoComplete="email"
          />
        );
      case "number":
        return (
          <InputNumber
            {...commonProps}
            value={value}
            onChange={onChange}
            style={{ width: "100%" }}
            controls={false} // remove up and down buttons
            changeOnWheel={false} // disable mouse wheel
            // precision={2}
            min={allowNegative ? -Infinity : 0} // single prop controls negative allowance
            onKeyDown={(e) => {
              // Allow copy, paste, cut, select all
              if (e.ctrlKey || e.metaKey) {
                return;
              }
              // block arrow up/down increment
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.stopPropagation();
                e.preventDefault();
              }

              // allow numbers, minus sign (only at start if negatives allowed), and navigation keys
              const isMinus =
                allowNegative &&
                e.key === "-" &&
                e.target.selectionStart === 0 &&
                !e.target.value.includes("-");
              const isDecimal = e.key === "." && !e.target.value.includes(".");

              if (
                !/[0-9]/.test(e.key) &&
                !allowedKeys.includes(e.key) &&
                !isMinus &&
                !isDecimal
              ) {
                e.preventDefault();
              }
            }}
            disabled={isDisabled}
          />
        );
      case "checkbox":
        return (
          <div className="gap-2 flex ">
            {isMandatory ? (
              <Checkbox
                {...commonProps}
                checked={checked}
                onChange={onChange}
                indeterminate={indeterminate}
              >
                <span style={labelStyle}>{CheckboxLabel} </span>
                {isMandatory && (
                  <span className="required-asterisk text-red-500">*</span>
                )}
              </Checkbox>
            ) : (
              <Checkbox
                {...commonProps}
                checked={checked}
                onChange={onChange}
                indeterminate={indeterminate}
              >
                <span style={labelStyle}>{CheckboxLabel} </span>
              </Checkbox>
            )}
            {label && (
              <div className="py-1">
                <label className="font-roboto text-xs" style={labelStyle}>
                  {label}
                  {isMandatory && (
                    <span className="required-asterisk text-red-500">*</span>
                  )}
                </label>
              </div>
            )}
          </div>
        );
      case "multiCheckbox":
        const allStateIds = options
          ?.filter((opt) => opt.value !== 0)
          .map((opt) => opt.value);
        const isAllSelected = allStateIds?.every((id) => value.includes(id));
        return (
          <div
            className="mx-3"
            style={{
              backgroundColor: "#f5f5f5",
              maxHeight: 250,
              overflowY: "auto",
              padding: "8px",
              borderRadius: 5,
              width: 300,
            }}
          >
            {options.map((option) => {
              const isChecked =
                option.value === 0
                  ? isAllSelected
                  : value.includes(option.value);
              return (
                <div
                  key={option.value}
                  className="flex items-center gap-1"
                  style={{ width: 250 }}
                >
                  <Checkbox
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={(e) => {
                      let updatedValues = [...value];
                      if (option.value === 0) {
                        // 'All' checkbox toggled
                        if (e.target.checked) {
                          updatedValues = allStateIds;
                        } else {
                          updatedValues = [];
                        }
                      } else {
                        // Individual state toggled
                        if (e.target.checked) {
                          updatedValues.push(option.value);
                        } else {
                          updatedValues = updatedValues.filter(
                            (val) => val !== option.value,
                          );
                        }
                      }
                      onChange(updatedValues);
                    }}
                  />
                  <label className="font-roboto text-xs">{option.label}</label>
                </div>
              );
            })}
          </div>
        );
      // case "multiSelectList":
      //   return (
      //     <MultiSelectList
      //       name={name}
      //       type={type}
      //       options={options}
      //       label={label}
      //       value={value}
      //       onChange={onChange}
      //       hideOptionCount={hideOptionCount}
      //       hideSearchBar={hideSearchBar}
      //     />
      //   );
      case "search":
        return (
          <Search
            className="font-roboto text-xs"
            {...commonProps}
            value={value}
            onChange={onChange}
            addonBefore={addonBefore}
            enterButton={<SearchOutlined />}
          />
        );
      case "password":
        return (
          <Password
            className="font-roboto text-xs"
            {...commonProps}
            value={value}
            onChange={onChange}
          />
        );
      case "textarea":
        return (
          <>
            <TextArea
              {...commonProps}
              className="font-roboto text-xs"
              value={value}
              onChange={onChange}
              rows={rows}
              placeholder={placeholder}
            />
          </>
        );
      case "dateRange":
        return (
          <RangePicker
            {...commonProps}
            value={value}
            onChange={onChange}
            format={dateFormat}
          />
        );
      case "timePicker":
        return (
          <TimePicker
            {...commonProps}
            value={value}
            onChange={onChange}
            format={timeFormat}
          />
        );
      case "date":
        return (
          <DatePicker
            // placement="bottomRight"
            disabled={isDisabled}
            popupClassName={popupClassName ? "custom-datepicker-dropdown" : ""}
            {...commonProps}
            disabledDate={disabledDate}
            value={value?.length > 0 ? dayjs(value) : undefined}

            onChange={(date, dateString) =>
              onChange({
                target: {
                  name,
                  label,
                  type,
                  value:
                    directValue
                      ? dateString
                      : {
                        raw: date, // Day.js object
                        formatted: dateString, // "2025-08-25"
                      },
                },
              })
            }
            // type="mask"
            format={dateFormat}
            // defaultValue={defaultValue}
            // locale={locale}
            // showTime={showTime}
            // minDate={dayjs(minDate, dateFormat)}
            // maxDate={dayjs(maxDate, dateFormat)}
            // disabledDate={(current) =>
            //   (minDate && current.isBefore(minDate, "day")) ||
            //   (maxDate && current.isAfter(maxDate, "day"))
            // }
            style={{ width: "100%", height: "100%" }}
            size={size}
            placeholder={`${placeholder}(YYYY-MM-DD)`}
          />

        );
      case "file":
        return (
          <Upload
            {...commonProps}
            beforeUpload={beforeUpload}
            showUploadList={showUploadList}
            ref={ref}
            onChange={(info) => onChange(info.fileList)}
          >
            {children || (
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            )}
          </Upload>
        );
      //   case "radioButton":
      //     return (
      //       <div
      //         className={`flex ${directionRow ? "sm:flex-row" : "sm:flex-col"}`}
      //       >
      //         <Radio.Group
      //           name={name}
      //           value={value}
      //           //  onChange={onChange}
      //           onChange={(e) => onChange(e.target.value)} // ✅ FIX
      //           className={`font-roboto text-xs ${radioButtonCenter && "self-center"}`}
      //         >
      //           {(optionList?.length > 0 ? optionList : options)?.map((item) => (
      //             <Radio
      //               className="font-roboto text-xs"
      //               key={item.value}
      //               value={item.value}
      //             >
      //               <span className="text-xs">{item.label}</span>

      //             </Radio>
      //           ))}
      //         </Radio.Group>
      //       </div>
      //     );
      case "radioButton":
        return (
          <div
            className={`flex ${directionRow ? "sm:flex-row" : "sm:flex-col"}`}
          >
            <Radio.Group
              name={name}
              value={value}
              //  onChange={onChange}
              onChange={(e) => onChange(e.target.value)}
              className={`font-roboto text-xs ${radioButtonCenter && "self-center"}`}
            >
              <Space direction={radioButtonDirection}>
                {(optionList?.length > 0 ? optionList : options)?.map(
                  (item) => (
                    <Radio
                      className="font-roboto text-xs"
                      key={item.value}
                      value={item.value}
                      disabled={isDisabled}
                    >
                      <span className="text-xs">{item.label}</span>
                      <p className="text-xs text-[#00000073]">
                        {item?.description}
                      </p>
                    </Radio>
                  ),
                )}
              </Space>
            </Radio.Group>
          </div>
        );
      default:
        return (
          <Input
            className="font-roboto text-xs"
            {...commonProps}
            type={type}
            value={value}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div
      className={`flex ${directionRow ? "sm:flex-row my-2 justify-between gap-1" : "sm:flex-col"}`}
    >
      {isLabel && type !== "checkbox" && (
        <div
          className={`${BesideLabelExtraAction ? "flex justify-between items-center" : 'py-1'}`}
        >
          <label className="font-roboto text-xs" style={labelStyle}>
            {label}
            {isMandatory && (
              <span className="required-asterisk text-red-500">*</span>
            )}
          </label>
          {BesideLabelExtraAction && <div>{<BesideLabelExtraAction />}</div>}
        </div>
      )}

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 5,
            colorBgContainer: colorBgContainer ? "#722ed1" : "#ffff",
          },
        }}
      >
        <Space direction="vertical">
          {renderFormFields()}
          {isError && (
            <div className="error-message font-roboto">
              <span className="text-xs text-red-500 font-roboto">
                {errorMessage}
              </span>
            </div>
          )}
        </Space>
      </ConfigProvider>
    </div>
  );
};

export default InputComponent;
