import React from "react";
import { Flex, Progress } from "antd";
const ProgressBar = ({
  percent,
  format,
  color,
  width,
  type,
  className,
  style,
  size,
  showInfo = false,
  trailColor,
}) => (
  <Flex vertical gap="small" style={{ width: width }}>
    <Progress
      className={className}
      percent={percent}
      size={size}
      style={style}
      format={format}
      strokeHeight={3}
      trailColor={trailColor}
      type={type}
      showInfo={showInfo}
      strokeColor={color}
      // status="exception"
    ></Progress>
  </Flex>
);

export default ProgressBar;
