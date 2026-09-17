import { Checkbox, Col, Empty, Form, Row, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import SelectComponent from "./selectComponent";

const getInitialFieldsValue = (fields) => {
    let initialValues = fields.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
    return initialValues;
};

const DynamicForm = ({
    getFieldsValueHandel = () => { },
    getInitialFieldsValueData = () => { },
    activeReport,
    formFields = [],
    form,
}) => {
    const [fields, setFields] = useState([]);

    const dependenceField = (updateFields, selectedValue, dependentColumn) => {
        let { DependentColumnName, options } = dependentColumn;
        let dependentOptions = options?.find((opt) => opt?.value === selectedValue)?.dependentoptions;
        return updateFields?.map((field) =>
            field.name === DependentColumnName ? { ...field, options: dependentOptions } : field
        );
    };

    const onchangeHandel = ({ target }) => {
        let { name, value, type, checked } = target;
        console.log("onchangeHandel", name, value, type, checked);

        const isDependentCol = fields?.find((field) => field.name === name);
        let updateFields = fields;

        if (isDependentCol?.isDependentOnOtherColumn) {
            updateFields = dependenceField(updateFields, value, isDependentCol);
        }

        let customValue = type === "checkbox" ? checked : type === "date" ? value?.formatted || value : value;

        updateFields = updateFields?.map((field) => (field.name === name ? { ...field, value: customValue } : field));

        setFields(updateFields);

        // Update form instance if provided
        if (form) {
            form.setFieldsValue({ [name]: customValue });
        }

        let params = updateFields?.map((field) => ({
            reportid: field?.reportid,
            label: field?.label,
            name: field?.name,
            value: field?.value,
            fieldId: field?.FieldId,
            transactiontype: "",
            transactionid: "",
        }));

        console.log("updateFields", updateFields);

        getFieldsValueHandel(params);
    };

    useEffect(() => {
        setFields(formFields);

        // Get initial values from formFields
        let initialData = getInitialFieldsValue(formFields);

        // Set initial values using the form instance if provided
        if (form && Object.keys(initialData).length > 0) {
            form.setFieldsValue(initialData);
        }

        getInitialFieldsValueData(initialData);
    }, [formFields.length, form]);

    return (
        <Row gutter={[4, 4]} className="p-2">
            {fields?.filter((field) => field.isVisible !== false).map((field) => (
                <Col
                    span={field.columnSpace || 6}
                    xs={24}
                    sm={12}
                    md={field.columnSpace || 6}
                    lg={field.columnSpace || 6}
                    key={field.name}

                >
                    {renderfields(field, onchangeHandel, form)}
                </Col>
            ))}
        </Row>
    );
};

export default DynamicForm;

export const renderfields = (field, onchangeHandel, form) => {
    let {
        type,
        name,
        label,
        value,
        isDisabled,
        isMandatory,
        placeholder,
        isError,
        errorMessage,
        maxLength,
        max,
        options,
        rows,
        allowNegative,
        radioButtonDirection,
        directValue,
        extra,
        BesideLabelExtraAction,
        decimalstep,
        allowDecimalNumber,
        dateFormatRange,
        mode,
        allowClear,
    } = field;

    // Get the current value from form if available
    const formValue = form?.getFieldValue(name);
    const currentValue = formValue !== undefined ? formValue : value;

    console.log("renderfields", name, type, label, formValue, currentValue, field);
    switch (type) {
        case "text":
        case "number":
        case "search":
        case "password":
        case "textarea":
        case "date":
        case "file":
            return (
                <Form.Item
                    name={name}
                    initialValue={currentValue}
                    rules={[{ required: isMandatory, message: `${label} is required!` }]}
                    extra={extra && <span className="text-[10px] font-medium text-[#00000073]">{extra}</span>}
                >
                    <InputComponent
                        label={label}
                        isLabel
                        name={name}
                        type={type}
                        value={currentValue}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                        isMandatory={isMandatory}
                        isError={isError}
                        errorMessage={errorMessage}
                        maxLength={maxLength}
                        max={max}
                        onChange={onchangeHandel}
                        style={{ width: "100%" }}
                        options={options}
                        rows={rows}
                        allowNegative={allowNegative}
                        directValue={directValue}
                        dateFormatRange={dateFormatRange}
                        BesideLabelExtraAction={BesideLabelExtraAction}
                    />
                </Form.Item>
            );
        case "multiCheckbox":
        case "multiSelectList":
        case "radioButton":
            return (
                <Form.Item
                    name={name}
                    initialValue={currentValue}
                    rules={[{ required: isMandatory, message: `${label} is required!` }]}
                >
                    <InputComponent
                        label={label}
                        isLabel
                        name={name}
                        type={type}
                        value={currentValue}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                        isMandatory={isMandatory}
                        isError={isError}
                        errorMessage={errorMessage}
                        maxLength={maxLength}
                        onChange={onchangeHandel}
                        style={{ width: "100%" }}
                        options={options}
                        radioButtonDirection={radioButtonDirection}
                    />
                </Form.Item>
            );
        case "dropdown":
            return (
                <Form.Item
                    name={name}
                    initialValue={currentValue}
                    rules={[{ required: isMandatory, message: `${label} is required!` }]}
                >
                    <SelectForDynamicForm
                        label={label}
                        isLabel
                        name={name}
                        type={type}
                        value={currentValue}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                        isMandatory={isMandatory}
                        isError={isError}
                        errorMessage={errorMessage}
                        maxLength={maxLength}
                        handleChange={onchangeHandel}
                        options={options}
                        width={"100%"}
                        height={"100%"}
                        mode={mode}
                        allowClear={allowClear}
                    />
                </Form.Item>
            );

        case "checkbox":
            console.log("isMandatory", isMandatory);
            return (
                <Form.Item
                    name={name}
                    valuePropName="checked"
                    initialValue={Boolean(currentValue)}
                    validateTrigger="onChange"
                    rules={[...(isMandatory ? [{ required: true, message: `${label} is required!` }] : [])]}
                >
                    <InputComponent
                        label={type != "checkbox" && label}
                        CheckboxLabel={label}
                        isLabel
                        name={name}
                        type={type}
                        value={Boolean(currentValue)}
                        checked={Boolean(currentValue)}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                        isMandatory={isMandatory}
                        errorMessage={errorMessage}
                        maxLength={maxLength}
                        onChange={onchangeHandel}
                        style={{ width: "100%" }}
                        options={options}
                    />
                </Form.Item>
            );

        case "switch":
            return (
                <Form.Item
                    name={name}
                    label={label}
                    initialValue={currentValue}
                    rules={[{ required: isMandatory, message: `${label} is required!` }]}
                    valuePropName="checked" // Important for Switch component
                >
                    <Switch size={"small"} />
                </Form.Item>
            );
        case "dateRange":
            return (
                <Form.Item
                    name={name}
                    initialValue={currentValue}
                    rules={[{ required: isMandatory, message: `${label} is required!` }]}
                >
                    <InputComponent
                        label={label}
                        isLabel
                        name={name}
                        type={type}
                        value={currentValue}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                        isMandatory={isMandatory}
                        isError={isError}
                        errorMessage={errorMessage}
                        maxLength={maxLength}
                        onChange={onchangeHandel}
                        style={{ width: "100%" }}
                        options={options}
                        radioButtonDirection={radioButtonDirection}
                    />
                </Form.Item>
            );
        case "email":
            return (
                <Form.Item
                    name={name}
                    initialValue={currentValue}
                    rules={[
                        ...(isMandatory ? [{ required: true, message: `${label} is required!` }] : []),
                        {
                            type: "email",
                            message: "Please enter a valid email address!",
                        },
                    ]}
                >
                    <InputComponent
                        label={label}
                        isLabel
                        name={name}
                        type="email"
                        value={currentValue}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                        onChange={onchangeHandel}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            );

        default:
            return (
                <Form.Item
                    name={name}
                    initialValue={currentValue}
                    rules={[{ required: isMandatory, message: `${label} is required!` }]}
                >
                    <InputComponent
                        label={label}
                        isLabel
                        name={name}
                        type={type}
                        value={currentValue}
                        directValue={true}
                        options={options}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                        isMandatory={isMandatory}
                        isError={isError}
                        step={decimalstep}
                        precision={allowDecimalNumber}
                        errorMessage={errorMessage}
                        maxLength={maxLength}
                        onChange={onchangeHandel}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            );
    }
};

const SelectForDynamicForm = ({
    label = "Search",
    options = [],
    isMandatory = false,
    handleChange,
    placeholder,
    name,
    value = "",
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
    mode = "tag",
    allowClear = true,
    prefixLabel = "",
    ...rest
}) => {
    return (
        <div className={`flex flex-col ${directionRow}  w-full`}>
            {isLabel == true ? (
                <div className="py-1">
                    <label className="font-roboto text-xs" style={labelStyle}>
                        {label}
                        {isMandatory ? <span className="required-asterisk text-red-500">*</span> : <span></span>}
                    </label>
                </div>
            ) : (
                " "
            )}

            <Select
                {...rest}
                showSearch
                className={className}
                style={{ width: width, height: height, ...style }}
                placeholder={placeholder}
                defaultActiveFirstOption
                variant={variant}
                value={value || undefined}
                size={size}
                optionFilterProp="label"
                options={options}
                notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data" />}
                allowClear={allowClear}
                disabled={disabled}
                mode={mode}
                prefix={prefixLabel}
                onChange={(value, data) => {
                    rest?.onChange?.(value, data);
                    console.log("handleChange", value, data, options);

                    handleChange({
                        target: {
                            name: name,
                            value: value,
                            label: data?.label,
                            extraData: data,
                        },
                    });
                }}
            />

            <div>
                {isError && (
                    <div className="error-message font-roboto">
                        <span className="text-xs text-red-500 font-roboto">{errorMessage}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
