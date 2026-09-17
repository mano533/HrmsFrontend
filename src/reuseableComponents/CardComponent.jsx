import { Card, ConfigProvider } from "antd";
import React from "react";

function CardComponent({
  width = "auto",
  height,
  cardContant,
  className,
  style,
  onClickCard,
  cover,
  actions,
  title,
  headerBg,
  size,
  bodyPadding = "10px 10px 0px 10px",
  boxShadow,
  classNames,
  headStyle
  // titleStyle,
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            bodyPadding: bodyPadding,
            actionsLiMargin: "5px",
            headerBg: headerBg,
            boxShadow: boxShadow,
          },
        },
      }}
    >
      <Card
        title={title}
        headStyle={headStyle}
        classNames={classNames}
        hoverable
        size={size}
        onClick={onClickCard}
        className={className}
        style={{ width: width, height: height, ...style }}
        cover={cover}
        actions={actions}
      >
        {cardContant}
      </Card>
    </ConfigProvider>
  );
}

export default CardComponent;
