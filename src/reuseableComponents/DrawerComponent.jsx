import { ConfigProvider, Drawer } from "antd";
import React, { Children } from "react";

function DrawerComponent({
  open = "",
  onClose = "",
  onCancel = "",
  children,
  title,
  className,
  closable,
  width = 500,
  titelColor,
  titleBgcolor,
  footer,
  drawerBody = {},
  headerActions,
  zIndex,
  mask = true
}) {
  return (
    <Drawer
      zIndex={zIndex}
      className={className ? `${className} font-roboto` : "font-roboto"}
      title={
        <div className="flex justify-between items-center">
          <h3 className="text-md flex items-center" style={{ margin: 0 }}>
            {title}
          </h3>
          {headerActions}
        </div>
      }
      open={open}
      onClose={onClose}
      closable={closable}
      onCancel={onCancel}
      width={width}
      footer={footer}
      styles={{
        header: { padding: 12 },
        body: {
          ...drawerBody,
        },
      }}
      mask={mask}
    >
      {children}
    </Drawer>
  );
}

export default DrawerComponent;
