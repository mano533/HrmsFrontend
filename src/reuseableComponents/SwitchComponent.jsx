import { ConfigProvider, Switch } from "antd";
import React from "react";

function SwitchComponent({
  className,
  onChange,
  value,
  defaultChecked,
  checked,
  size,
  disabled,
  colorPrimary = "var(--color-primary)",
  colorPrimaryHover = "var( --bg-solid-btn-hover)",
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorPrimary,
        },
        components: {
          Switch: {
            colorPrimary: colorPrimary,
            colorPrimaryHover: colorPrimaryHover,
          },
        },
      }}
    >
      <Switch

        defaultChecked={defaultChecked}
        className={className}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        value={value}
        size={size}
      />
    </ConfigProvider>
  );
}

export default SwitchComponent;
