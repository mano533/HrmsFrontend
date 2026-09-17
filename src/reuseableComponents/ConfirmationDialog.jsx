import React, {Children, useState} from "react";
import {Button, ConfigProvider, Modal, Popconfirm} from "antd";
const style = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)" /* semi-transparent black */,
    zIndex: 1000 /* must be below Popconfirm zIndex */,
};

const ConfirmationDialog = ({
    dailogBoxState = false,
    title = "Are you sure?",
    onConfirm,
    confirmLoading,
    onCancel,
    cancelText = "No",
    okText = "Yes",
    description,
    visible = false,
    placement = "bottom",
    zIndex = 1000,
    ishideButton = false,
    width = "auto",
}) => {
    return (
        <ConfigProvider>
            <Modal 
                open={dailogBoxState}
                title={title}
                onOk={onConfirm}
                onCancel={onCancel}
                okText={okText}
                cancelText={cancelText}
                centered
                zIndex={zIndex} // Highest layer
                // placement={placement}
                // okButtonProps={{ style: ishideButton && { display: "none" } }}
                width={width}
                closeIcon={false}
                confirmLoading={confirmLoading}
            >
                {description}
            </Modal>
        </ConfigProvider>
    );
};

export default ConfirmationDialog;
