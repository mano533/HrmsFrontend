import React, { Children, useState } from "react";
import { Button, ConfigProvider, Modal, Popconfirm } from "antd";
import DynamicIconComponent from "./IconComponent";
const style = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.3)" /* semi-transparent black */,
  zIndex: 1000 /* must be below Popconfirm zIndex */,
};

const ConfirmationPopup = ({
  dailogBoxState = false,
  title = "Are you sure?",
  onConfirm,
  onCancel,
  cancelText = "No",
  okText = "Yes",
  children,
  description,
  visible = false,
  iconName = "",
  iconColor = "",
  zIndex = 1000,
  placement,
  ishideButton = false,
}) => {
  const [first, setfirst] = useState(false);
  const showPopconfirm = () => {
    setfirst(true);
  };
  const handleOk = () => {
    setfirst(false);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Popconfirm: {
            zIndexPopup: zIndex,
            fontFamily: "'Roboto', sans-serif",
            /* here is your component tokens */
          },
          Button: {
            fontSize: 12,
          },
        },
      }}
    >
      {visible && <div style={style} />}
      <Popconfirm
        title={title}
        open={dailogBoxState}
        description={description}
        onConfirm={onConfirm}
        onCancel={onCancel}
        okText={okText}
        placement={placement}
        cancelText={cancelText}
        zIndex={9999} // Highest layer
        icon={
          <DynamicIconComponent
            iconName={iconName}
            iconSize={12}
            color={iconColor}
          />
        }
        okButtonProps={{ style: ishideButton && { display: "none" } }}
      >
        {children}
      </Popconfirm>
    </ConfigProvider>
  );
};

export default ConfirmationPopup;
