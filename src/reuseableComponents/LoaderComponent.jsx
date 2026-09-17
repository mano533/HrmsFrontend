import React from "react";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// Ant Design fullscreen loader
export function LoaderComponent({ size = "small" }) {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Spin
        fullscreen
        size={size}
        tip="Loading...."
        percent={80}
        indicator={
          <LoadingOutlined spin style={{ color: "#9355e1", fontSize: 60 }} />
        }
      />
    </div>
  );
}

// import React from 'react';
// import { Button, Spin } from 'antd';
// const LoaderComponent = () => {
//   const [spinning, setSpinning] = React.useState(false);
//   const [percent, setPercent] = React.useState(0);
//   const showLoader = () => {
//     setSpinning(true);
//     let ptg = -10;
//     const interval = setInterval(() => {
//       ptg += 5;
//       setPercent(ptg);
//       if (ptg > 120) {
//         clearInterval(interval);
//         setSpinning(false);
//         setPercent(0);
//       }
//     }, 100);
//   };
//   return (
//     <>
//       <Button onClick={showLoader}>Show fullscreen</Button>
//       <Spin spinning={spinning} percent={percent} fullscreen />
//     </>
//   );
// };
// export default App;

// Custom size-based loader
export function Loading({ size = "small" }) {
  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "100vh" }}
      gap="middle"
    >
      <Spin
        fullscreen
        size={size}
        tip="Loading...."
        percent={80}
        indicator={
          <LoadingOutlined spin style={{ color: "#9355e1", fontSize: 60 }} />
        }
      />
    </Flex>
  );
}
// Custom size-based loader
export function Spinner({ size = "small" }) {
  return (

    <Spin
      fullscreen
      size={size}
      tip="Loading...."
      percent={80}
      indicator={
        <LoadingOutlined spin style={{ color: "#9355e1", fontSize: 60 }} />
      }
    />

  );
}
