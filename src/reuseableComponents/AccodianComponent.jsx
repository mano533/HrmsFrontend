import React, { useEffect, useState } from "react";
import { Collapse, ConfigProvider, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const AccodianComponent = ({
  items = [
    {
      key: "1",
      header: "This panel can only be ",
      value: "value",
    },
  ],
  className,
  headerFontSize,
  headerBg,
  size = "small",
  activeKeyValue = null,
  accordion = true,
  onchange,

}) => {
  const { Panel } = Collapse;
  const [activeKey, setActiveKey] = useState(activeKeyValue);

  console.log("activeKey", activeKey);

  useEffect(() => { setActiveKey(activeKeyValue) }, [activeKeyValue])

  return (
    <Space direction="vertical" className="w-full">
      <Collapse
        accordion={accordion}
        size={size}

        // uncomment this if need to toggle on click of whole bar
        // onChange={(key) => setActiveKey(key || null)}
        // this if need to toggle on click of only icon
        expandIcon={({ isActive, panelKey }) => (
          <span
            onClick={(e) => {
              e.stopPropagation(); // prevent header click
              setActiveKey(isActive ? null : panelKey);
            }}
          >
            {isActive ? <UpOutlined /> : <DownOutlined />}
          </span>
        )}
        expandIconPosition="right"
        activeKey={activeKey} // control the expanded panel
        className="p-0"
        onChange={(key) => {
          setActiveKey(key || null);
          onchange?.(key);
        }}
      >
        {items.map((data) => (
          <Panel
            header={data.header}
            key={data.key}
            className={`font-semibold text-[#1E1E1E] text-xs ${className}`}
          >
            {data.value}
          </Panel>
        ))}
      </Collapse>
    </Space>
  );
};

export default AccodianComponent;
