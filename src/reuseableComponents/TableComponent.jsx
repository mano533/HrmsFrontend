import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Row, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
const TableComponent = ({
  rowData,
  columnData,
  className = "custom-table",
  children,
  handleRowClick = () => { },
  ColumnGroup = false,
  showPagination = true,
  modalColumn,
  isRowSelectionRequred = true,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  // const rowData = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     age: 32,
  //     address: "London No. 2 Lake Park",
  //   },
  // ];
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  let updataColumn = columnData.map((col, index) => ({
    ...col,
    width: 150,
    ...(col.searchable ? getColumnSearchProps(col.dataIndex) : {}),
  }));
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "pending":
        return "red";
      default:
        return "default";
    }
  };
  const rowSelection = {
    selectedRowKeys, // This holds the currently selected rows (key or keys)
    // type: "radio",
    onChange: (newSelectedRowKeys, selectedRows) => {
      console.log("Selected Rows (with all data):", selectedRows); // This will log the full row data
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedRows(selectedRows);
    },

    getCheckboxProps: (record) => {
      const isPending = selectedRows.some(
        (item) => item.key === record.key && item.pending === true
      );
      const isApproved = selectedRows.some(
        (item) => item.key === record.key && item.Approved === true
      );
      const isFinalize = selectedRows.some(
        (item) => item.key === record.key && item.Finalize === true
      );
      const isReject = selectedRows.some(
        (item) => item.key === record.key && item.Reject === true
      );
      const isPublished = selectedRows.some(
        (item) => item.key === record.key && item.Published === true
      );
      return {
        className: isPending
          ? "pendingColor" // Apply "pendingColor" if the row is pending
          : isApproved
            ? "approvedColor" // Apply "approvedColor" if the row is approved
            : isFinalize
              ? "finalizeColor"
              : isReject
                ? "rejectcolor"
                : isPublished
                  ? "publishedColor"
                  : "",
      };
    },
  };

  return (
    <Table
      // scroll={{ x: modalColumn == 3000 , y: 250 }}
      style={{ fontSize: "10px" }}
      sticky
      scroll={{ x: 'max-content' }}
      columns={updataColumn}
      dataSource={rowData}
      rowSelection={isRowSelectionRequred ? rowSelection : ""}
      className={className}
      onRow={(record) => ({
        onClick: () => handleRowClick(record), // This triggers on row click
      })}
      pagination={showPagination}
      bordered
    ></Table>
  );
};
export default TableComponent;
