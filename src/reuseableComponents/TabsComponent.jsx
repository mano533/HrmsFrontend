import { Button, ConfigProvider, Tabs } from "antd";
import DynamicIconComponent from "./IconComponent";
import {ApartmentOutlined, BankOutlined, EnvironmentOutlined, UserOutlined} from "@ant-design/icons";

function TabsComponent({
  item = [
    {
      key: "1",
      label: "Tab 1",
      content: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      content: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      content: "Content of Tab Pane 3",
    },
  ],
  tabPosition,
  color = "black",
  onClick,
  onChange,
  className,
  activeKey,
  defaultActiveKey,
  fontSize = 14,
  fontWeight,
  // fontFamily="font-roboto",
  //we can add button r any action button
  operations,
  style,
  size = "default"
}) {
  console.log("activeKey", activeKey, defaultActiveKey);
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: fontSize,
          colorText: color,
        },
      }}
    >
      <Tabs
        onClick={onClick}
        tabBarExtraContent={operations}
        defaultActiveKey={String(defaultActiveKey)}
        onChange={onChange}
        tabPosition={tabPosition}
        className={className}
        // items={item}
        activeKey={String(activeKey)}
        style={{ overflowY: "hidden", ...style }}
        size={size}

      >
        {item?.map((tabs) => (
          <Tabs.Item

            tab={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color:
                    tabs?.key == activeKey ? "var(--color-primary)" : "#9798B5",
                }}
              >
                {typeof (tabs?.icon) === "string" ? <DynamicIconComponent
                  iconName={tabs?.icon}
                  color={
                    tabs?.key == activeKey ? "var(--color-primary)" : "#9798B5"
                  }
                /> : tabs?.icon}

                {/* {tabs?.icon} */}
                <span>{tabs?.label}</span>
              </div>
            }
            key={tabs?.key}

          >
            {tabs.content}
          </Tabs.Item>
        ))}
      </Tabs>
    </ConfigProvider>
  );
}

export default TabsComponent;
