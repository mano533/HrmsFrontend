import React from "react";
import { Button, Tooltip } from "antd";

function ButtonComponent({
  ButtonName,
  onclickButton,
  className,
  children,
  buttonIcon,
  iconPosition = "start",
  htmlType = "button",
  loading = false,
  buttonSize = "default",
  variant = "solid", // 'solid' or 'outlined'
  isDisabled,
  color = "f59e0b",
  style,
  shape = "default",
  showTooltip = false,
  tooltipTitle = "",
  tooltipPlacement = "top",
  tooltipColor,
  btnbackground = "var(--btn-primary)"
}) {


  const btn = (
    <Button
      className={className}
      onClick={onclickButton}
      icon={buttonIcon}
      iconPosition={iconPosition}
      disabled={isDisabled}
      htmlType={htmlType}
      loading={loading}
      size={buttonSize}
      style={{ ...style, padding: "2px 5px", background: btnbackground }}
      type="default"
      variant={variant}
      color={color}
      shape={shape}
    >
      {children}
      {ButtonName}
    </Button>
  );

  return showTooltip ? (
    <Tooltip
      title={tooltipTitle}
      placement={tooltipPlacement}
      color={tooltipColor}
      overlayInnerStyle={{
        fontSize: "11px",
        maxWidth: "250px", // you can control width too
      }}
    >
      {btn}
    </Tooltip>
  ) : (
    btn
  );
}

export default ButtonComponent;
