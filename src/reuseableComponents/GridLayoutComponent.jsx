import { Col, Pagination, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import InputComponent from "./InputComponent";
import { fontSizeClass } from "../Assets/Fonts/typographyClasses";
import maleIcon from "../Assets/Image/maleIcon.png";
import femaleIcon from "../Assets/Image/femaleIcon.png";
import {
  BarsOutlined,
  EditOutlined,
  EllipsisOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import useResponsive from "../Hooks/UseResponsive";
import { Loading } from "./LoaderComponent";

const GridLayoutComponent = ({
  employeeRowFilterList,
  onclickCard,
  onChangeIndividual,
}) => {
  const screen = useResponsive();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [gridLoading, setGridLoading] = useState(false);
  const totalItems = employeeRowFilterList?.length;

  const [pagenatedData, setPagenatedData] = useState([]);
  useEffect(() => {
    setPagenatedData(employeeRowFilterList?.slice(0, pageSize));
  }, [employeeRowFilterList]);

  console.log("employeeRowFilterList", employeeRowFilterList);

  return (
    <>
      {gridLoading ? (
        <Row
          gutter={[12, 12]}
          className=" mb-2 overflow-y-auto min-h-[400px] flex justify-center"
        >
          <Loading size="large" />
        </Row>
      ) : (
        <Row gutter={[12, 12]} className=" mb-2 overflow-y-auto max-h-[420px]">
          {pagenatedData?.length == 0 ? (
            <Col
              className="w-[100%]"

            >
              <CardComponent
                className="flex justify-center"
                cardContant={<span>no data</span>}
              />
            </Col>
          ) : (
            <>
              {pagenatedData.map((list, i) => (
                <Col key={i} flex="20%">
                  <CardComponent
                    cardContant={
                      <div className="h-[200px]">

                        <div className="flex justify-between  ">


                          <InputComponent
                            type="checkbox"
                            value={employeeRowFilterList?.some(
                              (emp) =>
                                emp?.int_empid == list?.int_empid &&
                                emp?.isSelect == true
                            )}
                            onChange={(e) => {
                              onChangeIndividual(e, list?.int_empid);
                            }}

                          />


                          <Tag
                            color={
                              list?.currentstatus === "Current"
                                ? "success"
                                : "error"
                            }
                            className="text-xs"
                          >
                            {list?.currentstatus === "Current"
                              ? "Active"
                              : "In Active"}
                          </Tag>
                        </div>

                        <div
                          className="flex justify-center items-center align-middle"
                          onClick={() => {
                            onclickCard(list);
                          }}
                        >
                          <img
                            src={
                              list?.varchar_gender == "Male"
                                ? maleIcon
                                : list?.varchar_gender == "Female"
                                  ? femaleIcon
                                  : ""
                            }
                            style={{
                              borderRadius: "50%",
                              height: "70px",
                              width: "70px",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div className="flex flex-col items-center justify-center">
                          <span className="block text-xs sm:text-[12px] md:text-[12px] text-[#000000] font-roboto-semibold">
                            {list.varchar_fullname
                              ? list.varchar_fullname.length > 20
                                ? `${list.varchar_fullname.slice(0, 20)}...`
                                : list.varchar_fullname
                              : "-"}
                          </span>
                          <span className="block text-xs sm:text-[10px] md:text-[10px] text-[#6E6E6E] font-roboto-semibold">
                            {list.Designation || "-"}
                          </span>
                          <span className="block text-xs sm:text-[8px] md:text-[8px] text-[#6E6E6E] font-roboto">
                            {list.Department || "-"}
                          </span>
                        </div>

                        <Row className="my-1.5">
                          <Col xs={12} md={12} lg={12}>
                            {" "}
                            <div className="flex flex-col  ">
                              <span
                                className={`${fontSizeClass.profilesmalltext[screen]} text-[#ADADAD] font-roboto`}
                              >
                                DOB Date
                              </span>
                              <span
                                className={`${fontSizeClass.profilesmalltext[screen]} text-[#000] font-roboto-semibold`}
                              >
                                {list.date_dob || "-"}
                              </span>
                            </div>
                          </Col>
                          <Col xs={12} md={12} lg={12}>
                            {" "}
                            <div className="flex flex-col items-end ">
                              <span
                                className={`${fontSizeClass.profilesmalltext[screen]} text-[#ADADAD] font-roboto`}
                              >
                                Email
                              </span>
                              <span
                                className={`${fontSizeClass.profilesmalltext[screen]} text-[#000] font-roboto-semibold`}
                              >
                                {list.varchar_officeemail || "-"}
                              </span>
                            </div>
                          </Col>
                          <Col xs={12} md={12} lg={12}>
                            {" "}
                            <div className="flex flex-col ">
                              <span
                                className={`${fontSizeClass.profilesmalltext[screen]} text-[#ADADAD] font-roboto`}
                              >
                                Joined On
                              </span>
                              <span
                                className={`${fontSizeClass.profilesmalltext[screen]} text-[#000] font-roboto-semibold`}
                              >
                                {list?.date_joining || "-"}
                              </span>
                            </div>
                          </Col>
                          <Col xs={12} md={12} lg={12}>
                            {" "}
                            <div className="flex flex-col items-end ">
                              <span
                                className={`${fontSizeClass.profilesmalltext[screen]} text-[#ADADAD] font-roboto`}
                              >
                                Mobile number
                              </span>
                              <span
                                className={`${fontSizeClass.profilesmalltext[screen]} text-[#000] font-roboto-semibold`}
                              >
                                {list.varchar_mobilenumber || "-"}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    }
                    actions={[
                      <EditOutlined key="edit" />,
                      <SettingOutlined key="setting" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  ></CardComponent>
                </Col>
              ))}
            </>
          )}
        </Row>
      )}

      <Pagination
        defaultCurrent={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={(current, pageSize) => {
          let start = current * pageSize - pageSize;
          let end = current * pageSize;
          setCurrentPage(current);
          setPageSize(pageSize);
          setPagenatedData(employeeRowFilterList.slice(start, end));
          if (currentPage != current) {
            setGridLoading(true);
            t = setTimeout(() => {
              setGridLoading(false);
            }, 500);
          }
          return clearTimeout(t);
        }}
        size="large"
        className="flex justify-center "
        style={{ margin: 0 }}
      />
    </>
  );
};

export default GridLayoutComponent;
