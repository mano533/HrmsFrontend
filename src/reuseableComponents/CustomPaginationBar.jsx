import React from "react";
import { Col, Row, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import DynamicIconComponent from "./IconComponent";

const CustomPaginationBar = ({
  pageSize,
  handlePageSizeChange,
  startItem,
  endItem,
  totalItems,
  onPrevClick,
  onNextClick,
  showActionButton,
  actionItem,
}) => {
  return (
    <Row className="items-center" style={{ padding: "8px 0" }}>
      <Col
        className={
          showActionButton
            ? "flex items-center justify-between w-full"
            : "flex items-center justify-end w-full"
        }
      >
        {/* Pagination controls */}
        <div className="flex items-center gap-4">
          {/* Rows per page */}
          <div className="flex items-center gap-1">
            <span className="font-[500] text-xs font-roboto">
              Rows per page:&nbsp;
            </span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              style={{
                width: "auto",
                height: 24,
                fontSize: 12,
                fontWeight: 500,
                padding: "2px 4px",
              }}
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Page range display */}
          <div className="font-[500] text-xs font-roboto">
            <span
              style={{ fontSize: 12 }}
            >{`${startItem} - ${endItem} of ${totalItems}`}</span>
          </div>

          {/* Navigation arrows */}
          <div className="font-[500] text-xs font-roboto pt-2">
            <Space>
              <DynamicIconComponent
                iconName="MdKeyboardArrowLeft"
                className="cursor-pointer"
                onclickIcon={onPrevClick}
                iconSize="20px"
                color="#000"
              />
              <DynamicIconComponent
                iconName="MdKeyboardArrowRight"
                className="cursor-pointer"
                onclickIcon={onNextClick}
                iconSize="20px"
                color="#000"
              />
            </Space>
          </div>
        </div>

        {/* Action button area */}
        {showActionButton && <div>{actionItem}</div>}
      </Col>
    </Row>
  );
};

export default CustomPaginationBar;
