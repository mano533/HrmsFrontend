import React from "react";
import { Card, Skeleton } from "antd";

const SkeletonComponent = () => (
  <Card style={{ width: "100%" }}>
    <Skeleton active title={{ width: "60%" }} paragraph={{ rows: 4 }} />
  </Card>
);

export default SkeletonComponent;
