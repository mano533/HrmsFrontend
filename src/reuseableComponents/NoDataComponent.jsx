import React from "react";
import { Button, Empty, Typography } from "antd";

export default function NoDataComponent({ description = "No Data" }) {
  return (
    <div className="flex justify-center items-center">
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        styles={{ image: { height: 60 } }}
        description={<Typography.Text>{description}</Typography.Text>}
      />
    </div>
  );
}
