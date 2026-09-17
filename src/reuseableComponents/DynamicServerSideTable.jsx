import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Empty, Input, Row, Table, Dropdown, Menu } from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApiServices } from "../Hooks/UseApiServices";
import SearchBarComponent from "./SearchBarComponent";
import { setMainDropdownOptionsList } from "../Redux/Features/DropdownOptionsList/store_main_dropdown_options_list";
import { env, tableCustomFields } from "../Utils/constant";
import useDebounce from "../Hooks/UseDebounce";
import useResponsive from "../Hooks/UseResponsive";
import ButtonComponent from "./ButtonComponent";
import { fontSizeClass } from "../Assets/Fonts/typographyClasses";
import AddEmployeeDetailsStatutory from "../Pages/Statutory/establishment/EmployeeList/AddEmployeeDetailsStatutory";
import apiUrls from "../Assets/Configs/apiUrlList";
import { dataToExcelExport } from "../CommonFuncitons/constant";
import { FiUpload } from "react-icons/fi";
import { LoaderComponent, Loading } from "./LoaderComponent";
import DynamicIconComponent from "./IconComponent";
import ModalComponent from "./ModalComponent";
import DynamicTableComponent from "./DynamicTableComponent";
import { passwordColumn } from "../Assets/Configs/generalList";
import { useToastMessage } from "../Hooks/UseToastMessage";
import { getHRMSPermissions } from "../Pages/EDBMS/HRMS-Permissions/hrms_permissions";

const DynamicServerSideTable = ({
  apiUrl = "",
  handelName = "",
  globalListSearchValue = "",
  globalListSearchValueStatutory = "",
  globalListStatutorySearchValue,
  tableName = "DEFAULT_COLUMNS",
  headerName,
  uniqueId = "id",
  size = "small",
  isPagination = true,
  isRowSelection = true,
  getSelectedRows = () => { },
  getFullTableRows = () => { },
  className = "",
  scroll = { x: "max-content" },
  rowClassName,
  handleActionClick,
  extraQueryParams = {}, // used for additional parameter from any module
  searchPlaceholder, // Custom search placeholder
  addtionalHeaderContent, // for Custom Table tom action content
  companyOverride, // to pass dynamic query params and payload field
  isSearchLabel, // Search label for search box
  employeeType = 1, // employeeType is used for filter ALL(2) , Current(1) , Past(0) Employee it will return
  navigateto = "employee-profile", // in table when we click on employee where to navigate => navigateto
}) => {
  console.log("apiUrl", apiUrl);

    // getHRMSPermissions
  const perms = getHRMSPermissions()

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AllDetails = useSelector((state) => state?.selectedMainDropdownDetails);

  const refreshTable = useSelector((state) => state?.refreshservertableapi); // refreshTable , to refresh Table

  const {
    companyList,
    deputedCompanyList,
    userDetails,
    FinancialYear,
    monthId,
    Months,
  } = AllDetails;

  // Company id, company code & deputed company id based on condition (used for po module)
  const finalCompanyId = companyOverride?.companyId ?? companyList?.value;
  const finalCompanyCode =
    companyOverride?.companyCode ?? companyList?.companycode;
  const finalDeputedCompanyId =
    companyOverride?.deputedCompanyId ?? deputedCompanyList?.value ?? 0;

  const { postApi, loadingStates, getApi } = useApiServices();
  const { setValueForDebounce, debouncedSearch } = useDebounce("", 500);
  const screen = useResponsive();

  const [tableConfig, setTableConfig] = useState({
    columns: [],
    rows: [],
    pageSize: 10,
    pageNumber: 1,
    totalCount: 0,
  });

  const [searchState, setSearchState] = useState({
    searchText: "",
    searchedColumn: "",
    searchedArray: [],
    selectedRowKeys: [],
  });

  const [columnsHeaders, setColumnHeaders] = useState([]);
  const [paginationParams, setPaginationParams] = useState({});

  // Search configuration
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{ padding: 8, width: "200px" }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            const value = e.target.value ? [e.target.value] : [];
            setSelectedKeys(value);
            handleSearch(value, confirm, dataIndex);
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          allowClear
        />
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#ffc069" : undefined }} />
    ),

    onFilter: null, // Disable local filtering for server-side search

    render: (text) =>
      searchState.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchState.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Handle search functionality
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    console.log("dataIndex", dataIndex);
    confirm(false);
    setSearchState((prev) => ({
      ...prev,
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    }));
    setValueForDebounce(selectedKeys[0]);
  };

  // Configure table columns with sorting, filtering, and search
  const configureTableColumns = (columnsData) => {
    console.log("columnsData", columnsData);
    const columnNames = columnsData?.map((item) => item?.dataIndex);
    setColumnHeaders(columnNames);

    const enhancedColumns = columnsData?.map((column) => ({
      ...column,
      sorter: column?.fieldSort
        ? createSorter(column.dataType, column.dataIndex)
        : null,
      onFilter: column?.fieldFilter
        ? (value, record) => record[column.dataIndex] === value
        : null,
      filters: column?.filters || null,
      ...(column?.fieldSearch ? getColumnSearchProps(column.dataIndex) : {}),
      render: column.render || undefined,
    }));

    setTableConfig((prev) => ({ ...prev, columns: enhancedColumns }));
  };

  // Handle row selection
  const handleRowSelection = (newSelectedRowKeys, newSelectedRowRecords) => {
    console.log(
      "handleRowSelection",
      newSelectedRowKeys,
      newSelectedRowRecords,
    );

    setSearchState((prev) => ({
      ...prev,
      selectedRowKeys: newSelectedRowKeys,
    }));

    getSelectedRows(newSelectedRowKeys, newSelectedRowRecords);
  };

  // Handle table changes (pagination, sorting, filtering)
  const handleTableChange = (pagination, filters, sorter, extra) => {
    const { current, pageSize } = pagination;

    setTableConfig((prev) => ({
      ...prev,
      pageNumber: current,
      pageSize,
    }));

    // Handle filters for server-side search
    if (extra.action === "filter") {
      const searchFilters = Object.entries(filters)
        .filter(([_, value]) => value && value.length)
        .map(([columnName, value], index) => ({
          searchorder_no: index + 1,
          searchcolumn_name: columnsHeaders[columnName - 1],
          searchcolumn_value: value[0],
        }));

      setSearchState((prev) => ({ ...prev, searchedArray: searchFilters }));
    }

    // Fetch data for pagination and sorting
    if (extra.action === "paginate" || extra.action === "sort") {
      fetchTableData({
        pageNumber: current,
        pageSize,
        sortBy: sorter?.field || "",
        sortDir: getSortDirection(sorter?.order),
      });
    }
  };

  // Fetch table data from API
  const fetchTableData = async (params = {}) => {
    const updatedParams = { ...paginationParams, ...params };
    console.log(params, "params");

    setPaginationParams(updatedParams);

    try {
      const requestPayload = {
        companyId: finalCompanyId,
        companycode: finalCompanyCode,
        deputedCompanyId: finalDeputedCompanyId,
        userid: userDetails?.userId,
        empStatus: employeeType,
        deptid: extraQueryParams?.deptid ?? 0,
        desigtid: extraQueryParams?.desigtid ?? 0,
        statusid: extraQueryParams?.statusid ?? 0,
        selectedempid: extraQueryParams?.selectedempid ?? 0,
        monthid: monthId,
        financial_yearid: FinancialYear?.value,
        financial_Year: FinancialYear?.label,
        searchstring: searchState.searchedArray,
        ...updatedParams,
      };

      const result = await postApi(
        handelName,
        apiUrl +
        `?ApiUserid=alpadmindcore@alpconsulting.in&_companyid=${finalCompanyId}&_companycode=${finalCompanyCode} `,
        [requestPayload],
      );

      const data = result[0];

      if (data) {
        getFullTableRows(data);
        updateTableState(data);
      }
    } catch (error) {
      console.error(`Error fetching ${handelName}:`, error);
    }
  };

  // Update table state with API response
  const updateTableState = (data) => {
    setTableConfig((prev) => ({
      ...prev,
      pageNumber: data?.PageNumber,
      pageSize: data?.PageSize,
      totalCount: data?.TotalCount,
      rows: data?.Rows || [],
    }));

    const formattedColumns = data?.Columns?.filter(
      (col) => col.is_donotdisplay == 0 && col.is_visible == 1,
    )?.map((col, index) => ({
      ...tableCustomFields[tableName](
        col,
        index,
        handleCardClick,
        handleActionClick,
        perms, // Functionality permission prop
      ),
    }));

    console.log("formattedColumns", data?.Columns, formattedColumns);

    configureTableColumns(formattedColumns);
  };

  // Handle card click navigation
  const handleCardClick = (employee) => {
    // console.log("handleactionclick ",employee);
    dispatch(setMainDropdownOptionsList({ employeeDetails: employee }));

    navigate(`${navigateto}/${employee[uniqueId]}`, {
      state: employee.varchar_empno,
    });
  };



  // Fetch data when dependencies change
  useEffect(() => {
    fetchTableData({
      searchstring: searchState.searchedArray,
      pageSize: 10,
      pageNumber: 1,
    });
  }, [
    debouncedSearch,
    companyList?.value,
    deputedCompanyList?.value,
    searchState?.searchedArray?.length,
    monthId,
    Months?.value,
    employeeType,
    finalCompanyId,
    finalCompanyCode,
    finalDeputedCompanyId,
    JSON.stringify(extraQueryParams), // 🔥 REQUIRED
    refreshTable, // to refresh Table
  ]);

  if (tableConfig.columns.length === 0 && !loadingStates[handelName]) {
    return <Empty description="No Table Found" />;
  }

  return (
    <div>
      {globalListSearchValue && (
        <TableHeader
          searchState={searchState}
          tableConfig={tableConfig}
          fetchTableData={fetchTableData}
          isRowSelection={isRowSelection}
          searchPlaceholder={searchPlaceholder}
          addtionalHeaderContent={addtionalHeaderContent}
          isSearchLabel={isSearchLabel}
          getSelectedRows={getSelectedRows}
        />
      )}

      {globalListSearchValueStatutory && (
        <TableHeaderStatutory
          searchState={searchState}
          tableConfig={tableConfig}
          employeeType={employeeType}
          AllDetails={AllDetails}
          getApi={getApi}
          loadingStates={loadingStates}
          fetchTableData={fetchTableData}
          getSelectedRows={getSelectedRows}
          postApi={postApi}
          perms={perms}
        />
      )}

      <Table
        columns={tableConfig.columns}
        dataSource={tableConfig.rows}
        rowKey={uniqueId}
        rowSelection={
          isRowSelection && {
            selectedRowKeys: searchState.selectedRowKeys,
            onChange: handleRowSelection,
            fixed: true,
          }
        }
        size={size}
        pagination={getPaginationConfig()}
        onChange={handleTableChange}
        scroll={getScrollConfig()}
        loading={loadingStates[handelName]}
        className={`custom-table ${className}`}
        rowClassName={rowClassName}
        style={{ maxHeight: screen === "isWideScreen" ? 550 : 550 }}
      />
    </div>
  );

  // Helper functions
  function getPaginationConfig() {
    if (!isPagination || tableConfig.totalCount <= 10) return false;

    return {
      current: tableConfig.pageNumber,
      pageSize: tableConfig.pageSize,
      showSizeChanger: true,
      pageSizeOptions: ["10", "15", "20", "50"],
      total: tableConfig.totalCount,
    };
  }

  function getScrollConfig() {
    return tableConfig.pageSize > 10
      ? { y: screen === "isWideScreen" ? 350 : 350, x: "auto" }
      : { y: screen === "isWideScreen" ? 350 : 350, ...scroll };
  }
};

export default DynamicServerSideTable;

// Table Header Component
const TableHeader = ({
  searchState,
  tableConfig,
  fetchTableData,
  isRowSelection,
  searchPlaceholder,
  addtionalHeaderContent,
  isSearchLabel,
}) => {
  const { setValueForDebounce, debouncedSearch } = useDebounce();
  const [searchedValue, setSearchedValue] = useState("");

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("debouncedSearch", debouncedSearch);
    fetchTableData(
      debouncedSearch.length > 0
        ? { globalsearch_string: debouncedSearch.trim() }
        : { globalsearch_string: "" },
    );
  }, [debouncedSearch]);

  return (
    <Row className="mb-1">
      <Col span={24}>
        <div className="flex items-center gap-4">
          {isRowSelection === true && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#6F6F6F] font-normal">
                Select All ({searchState.selectedRowKeys.length}/
                {tableConfig.totalCount})
              </span>
            </div>
          )}
          <SearchBarComponent
            size="small"
            placeholder={
              searchPlaceholder
                ? searchPlaceholder
                : "Search by Emp No, Name, Department, Designation"
            }
            style={{ width: "320px" }}
            // placeholder="Search by Emp No, Name, Department, Designation"
            // className="w-full max-w-md"
            onChange={(e) => {
              setSearchedValue(e.target.value);
              setValueForDebounce(e.target.value);
            }}
            isSearchLabel={isSearchLabel}
            value={searchedValue}
          />
          {addtionalHeaderContent}
        </div>
      </Col>
    </Row>
  );
};

// Table Header Component
const TableHeaderStatutory = ({
  searchState,
  tableConfig,
  fetchTableData,
  employeeType,
  AllDetails,
  getApi,
  postApi,
  loadingStates,
  isSearchLabel,
  perms,
}) => {
  const {
    companyList,
    deputedCompanyList,
    userDetails,
    FinancialYear,
    monthId,
    Months,
  } = AllDetails;
  console.log("fetchTableData", searchState, tableConfig, employeeType);

  const { setValueForDebounce, debouncedSearch } = useDebounce();
  const { showToast } = useToastMessage();
  const [searchedValue, setSearchedValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [passwordRowData, setPasswordRowData] = useState([]);
  console.log("passwordRowData", passwordRowData);

  const [settingTitle, setSettingTitle] = useState(
    "Export First Leval Password",
  );

  const isFirstRun = useRef(true);

  const oncloseAddEmployee = () => {
    setOpenDrawer(false);
  };

  const onclickExport = async () => {
    // get_Statutory_ExportEmployeeDetails
    setOpenLoading(true);
    try {
      let params = {
        CompanyID: companyList?.value,
        DeputedcompanyID: deputedCompanyList?.value,
        API_UserID: env.VITE_APP_AUTH_API_USERNAME,
        Status: employeeType,
        _companyID: companyList.value,
        _companycode: companyList.companycode,
      };
      console.log("params", params);

      const result = await getApi(
        "onclickExport",
        `${apiUrls.statutory.get_Statutory_ExportEmployeeDetails}`,
        params,
      );
      if (result) {
        setOpenLoading(false);
        dataToExcelExport(result.TemplateData, "Employee Master Data");
      }
      console.log("result", result);
    } catch (error) {
      console.error("getStatutoryConfiguration Error:", error);
    }
  };
  const menu = (
    <Menu className="profileMenu">
      <Menu.Item
        key="phone"
        className="innerMenu"
        onClick={() => {
          onclickSetting("Export First Leval Password");
        }}
      >
        <span>Export First Leval Password</span>
      </Menu.Item>

      <Menu.Item
        onClick={() => {
          onclickSetting("Export Second Leval Password");
        }}
      >
        <span>Export Second Leval Password</span>
      </Menu.Item>
    </Menu>
  );
  const onclickSetting = async (title) => {
    if (searchState?.selectedRowKeys.length <= 0) {
      showToast("error", "Please Select Employee Number")


    } else {

      await onclickPasswordExport();
      setSettingTitle(title);
      setOpenSetting(true);
    }
  };

  const onclickPasswordExport = async () => {
    try {
      let params = [
        {
          EmpId: searchState?.selectedRowKeys.toString(),
        },
      ];
      console.log("searchState", searchState);

      const result = await postApi(
        "onclickPasswordExport",
        `${apiUrls.statutory.getExportPasswords}?ApiUserId=alpadmindcore@alpconsulting.in&Cid=${companyList.value}&Dcid=${deputedCompanyList.value}&LevelType=${settingTitle == "Export First Leval Password" ? 1 : 2} `,
        params,
      );
      setPasswordRowData(result);
      console.log("result", result);
    } catch (error) {
      console.error("Error fetching payroll employees:", error);
    }
  };

  const sendEMailPassword = async () => {
    try {
      let params = passwordRowData;
      // [
      //   {
      //     // "EmpId": "string",
      //     EmpNo: "string",
      //     UserName: "string",
      //     FullName: "string",
      //     Password: "string",
      //     CompanyCode: "string",
      //     OfficialMail: "string",

      //     EmpId: searchState?.selectedRowKeys.toString(),
      //   },
      // ];
      const result = await postApi(
        "sendEMailPassword",
        `${apiUrls.statutory.getEmailPassword}?ApiUserId=alpadmindcore@alpconsulting.in&Cid=${companyList.value}&Dcid=${deputedCompanyList.value}&AdminUserId=${1} `,
        params,
      );
      console.log("result", result);
    } catch (error) {
      console.error("Error fetching payroll employees:", error);
    }
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("debouncedSearch", debouncedSearch);
    fetchTableData(
      debouncedSearch.length > 0
        ? { globalsearch_string: debouncedSearch.trim() }
        : { globalsearch_string: "" },
    );
  }, [debouncedSearch]);

  if (openLoading) {
    return <LoaderComponent />;
  }
  return (
    <Row className=" py-2">
      <Col span={24}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs text-[#6F6F6F] font-normal">
              Select All ({searchState.selectedRowKeys.length}/
              {tableConfig.totalCount})
            </span>
          </div>
          <SearchBarComponent
            size="small"
            placeholder="Search by Emp No, Name, Department, Designation"
            className="w-full max-w-md"
            onChange={(e) => {
              setSearchedValue(e.target.value);
              setValueForDebounce(e.target.value);
            }}
            value={searchedValue}
          />
          <div className="flex gap-2 items-center">
            <span className="text-xs  text-[#262525]">
              <span className="text-xs font-bold text-[#262525]">
                {tableConfig.totalCount}
              </span>{" "}
              <br />
              Employees
            </span>

            <span className="text-xs  text-[#262525]">
              <span className="text-xs font-bold text-[#262525]">
                {searchState.selectedRowKeys.length}
              </span>{" "}
              <br />
              Selected
            </span>
          </div>
          <div>
          {perms?.hrms_emplist_settings &&  <div className="">
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                trigger={["hover"]}
              >
                <div>
                  <DynamicIconComponent
                    color="#000"
                    iconName="IoSettingsOutline"
                    onClick={onclickSetting}
                  />
                </div>
              </Dropdown>
            </div>}
          </div>
          <div className="flex gap-3">
            {perms?.export_employee_list &&<ButtonComponent
              style={{ fontSize: "10px" }}
              variant="outlined"
              ButtonName="Export"
              buttonIcon={<FiUpload />}
              className={`${fontSizeClass.smallText[screen]} font-roboto`}
              onclickButton={() => onclickExport()}
            // backgroundColor="#9355E1"
            />}
          {perms?.add_new_employee && <ButtonComponent
              style={{ fontSize: "10px" }}
              ButtonName="Add New Employee"
              className={`${fontSizeClass.smallText[screen]} font-roboto`}
              onclickButton={() => setOpenDrawer(true)}
              backgroundColor="#9355E1"
            />}
          </div>
        </div>
      </Col>
      <AddEmployeeDetailsStatutory
        openDrawer={openDrawer}
        oncloseAddEmployee={oncloseAddEmployee}
      />

      <ModalComponent
        title={settingTitle}
        modalWidth={700}
        openModal={openSetting}
        onClose={() => {
          setOpenSetting(false);
        }}
        modalContent={
          <div>
            <DynamicTableComponent
              columnsData={passwordColumn}
              rowData={passwordRowData}
            />
            <div className="flex justify-center gap-4 p-4">
              <ButtonComponent
                ButtonName="close"
                onclickButton={() => {
                  setOpenSetting(false);
                }}
              />
              {settingTitle == "Export Second Leval Password" ? (
                <ButtonComponent
                  ButtonName="Export"
                  onclickButton={() =>
                    dataToExcelExport(
                      getExportPasswordList,
                      `Export_Selected_Employee_Passwords`,
                    )
                  }
                  iconPosition="end"
                  buttonIcon={
                    <DynamicIconComponent iconName="BiExport" color="#fff" />
                  }
                />
              ) : (
                <>
                  <ButtonComponent
                    ButtonName="Export"
                    iconPosition="end"
                    onclickButton={() =>
                      dataToExcelExport(
                        passwordRowData,
                        `Export_Selected_Employee_Passwords`,
                      )
                    }
                    buttonIcon={
                      <DynamicIconComponent iconName="BiExport" color="#fff" />
                    }
                  />
                  <ButtonComponent
                    ButtonName="Send Mail"
                    iconPosition="end"
                    onclickButton={sendEMailPassword}
                    buttonIcon={
                      <DynamicIconComponent
                        iconName="AiTwotoneMail"
                        color="#fff"
                      />
                    }
                  />
                </>
              )}
            </div>
          </div>
        }
      />
    </Row>
  );
};

// Helper function to create sorters
const createSorter = (dataType, dataIndex) => {
  const sorters = {
    string: (a, b) => (a[dataIndex] || "").localeCompare(b[dataIndex] || ""),
    number: (a, b) => (Number(a[dataIndex]) || 0) - (Number(b[dataIndex]) || 0),
    default: (a, b) => (a[dataIndex] || "").localeCompare(b[dataIndex] || ""),
  };

  return sorters[dataType] || sorters.default;
};

// Helper function to get sort direction
const getSortDirection = (order) => {
  const directions = {
    ascend: "ASC",
    descend: "DESC",
  };
  return directions[order] || "";
};
