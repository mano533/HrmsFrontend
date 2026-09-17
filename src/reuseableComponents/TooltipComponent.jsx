import React from "react";
import { Tooltip } from "antd";

const TooltipComponent = ({ children, title, placement = "top", ...props }) => {
  return (
    <Tooltip {...props} title={title} placement={placement}  >
      {children}
    </Tooltip>
  );
};

export default TooltipComponent;
