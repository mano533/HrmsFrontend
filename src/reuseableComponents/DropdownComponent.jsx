import React from "react";
import {DownOutlined} from "@ant-design/icons";
import {Dropdown, Space} from "antd";

const DropdownComponent = ({
    items = [],
    trigger = ["click"],
    placement = "bottomLeft",
    children = "Click me",
    icon = <DownOutlined />,
    disabled = false,
    arrow = false,
    overlayClassName = "",
    onOpenChange = () => {},
    onClick = () => {},
}) => {
    return (
        <Dropdown
            menu={{items}}
            trigger={trigger}
            placement={placement}
            disabled={disabled}
            arrow={arrow}
            overlayClassName={overlayClassName}
            onOpenChange={onOpenChange}
        >
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                <Space>
                    {children}
                    {icon}
                </Space>
            </a>
        </Dropdown>
    );
};

export default DropdownComponent;
