import React from "react";
import { ConfigProvider, Segmented } from "antd";
const SegmentComponent = ({
  options = [],
  width,
  value,
  onChange,
  style,
  name,
  type,
  size,
  className,
  shape = "round",
  trackBg = "rgba(255, 255, 255, 0.67)",
}) => (
  <ConfigProvider
    theme={{
      components: {
        Segmented: {
          trackBg: trackBg,
          colorText: "#562F89",
          fontSize: "12px",    
        },
        
      },
    }}
  >
    <Segmented
      size={size}
      type={type}
      className={className}
      style={style}
      options={options}
      onChange={onChange}
      shape={shape}
      width={width}
      name={name}
      // defaultValue={options[0].value}
      value={value}
    />
  </ConfigProvider>
);
export default SegmentComponent;
