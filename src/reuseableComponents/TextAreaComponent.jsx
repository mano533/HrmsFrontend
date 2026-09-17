import { Input } from "antd";
import React from "react";

const { TextArea } = Input;

function TextAreaComponent({
  label = "Dummy",
  placeholder = "",
  name = "",
  value = "",
  handleChange = "",
  isMandatory = true,
}) {
  return (
    <div>
      {" "}
      <div style={{ padding: "8px" }}>
        <label>
          {label}
          {isMandatory ? <span className="error">*</span> : <span></span>}
        </label>
      </div>
      <TextArea
        placeholder={placeholder}
        name={name}
        type
        value={value}
        handleChange={handleChange}
        autoSize
      />
    </div>
  );
}

export default TextAreaComponent;
