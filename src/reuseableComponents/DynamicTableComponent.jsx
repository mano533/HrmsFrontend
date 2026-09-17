import React, { useEffect, useRef, useState } from "react";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Empty, Input, Space, Table, theme } from "antd";
import Highlighter from "react-highlight-words";
import { createStyles } from "antd-style";
import { LoaderComponent } from "./LoaderComponent";

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
            ${antCls}-table {
                ${antCls}-table-container {
                    ${antCls}-table-body,
                    ${antCls}-table-content {
                        scrollbar-width: thin;
                        scrollbar-color: #eaeaea transparent;
                    }
                }
            }
        `,
    };
});

const DynamicTableComponent = ({
    columnsData = [],
    rowData = [],
    uniqueId = "id",
    size = "small",
    loader = false,
    isPagination = true,
    isRowSelection = true,
    getSelectedRows = () => { },
    className = "",
    scroll = { x: true },
    style,
    rowClassName,
    customPageSize = 5,
    getpageDate = () => { },
    refresh = "",
    defaultSelectedRows = [],
    summary, // this will create table summary like last row
    onRow,
    getFiltedCurrentData, // this function is used to get column filtered data
}) => {
    const searchInput = useRef(null);
    const [columns, setColumns] = useState(columnsData);
    const [pageSize, setPageSize] = useState(customPageSize);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [tableLoader, setTableLoader] = useState(loader || false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([...defaultSelectedRows]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm(false);
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8, width: "200px" }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        let value = e.target.value ? [e.target.value] : [];
                        console.log("value", value);
                        if (!value) {
                            clearFilters?.();
                            confirm(true);
                        }
                        handleSearch(value, confirm, dataIndex);
                    }}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    allowClear
                />
            </div>
        ),

        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,

        onFilter: (value, record) => (record[dataIndex]?.toString().toLowerCase() || "").includes(value.toLowerCase()),

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
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columnsConfigurationHandel = () => {
        let updateColumns = columnsData?.map((col) => {
            console.log("columnsData", columnsData);

            // field sort
            let fieldSorter = col?.fieldSort ? renderSortMethods(col.dataType, col.dataIndex) : null;

            // field search
            let fieldSearch = col?.fieldSearch ? getColumnSearchProps(col.dataIndex) : {};

            // field filter
            let filedFilter = col?.fieldFilter ? (value, record) => record[col?.dataIndex] === value : null;

            let filters = col?.filters || null;


            return {
                ...col,
                sorter: fieldSorter,
                onFilter: filedFilter,
                fixed: col.fixed,
                width: col.width || 150,
                filters,
                ...fieldSearch,
                render: col.render || (fieldSearch?.render ?? undefined),
            };
        });

        setColumns(updateColumns);
    };

    const onSelectChange = (newSelectedRowKeys, newSelectedRowRecords) => {
        setSelectedRowKeys(newSelectedRowKeys);
        console.log(selectedRowKeys, newSelectedRowRecords, "newSelectedRowRecords");

        getSelectedRows(newSelectedRowKeys, newSelectedRowRecords);
    };

    const handleTableChange = (pagination, filters, sorter, extra) => {
        console.log("extra", extra);
        getFiltedCurrentData(extra.currentDataSource);
        if (currentPage !== pagination.current) {
            setCurrentPage(pagination.current);
            getpageDate(pagination.pageSize, pagination.current);
            setTableLoader(true);

            let timer = setTimeout(() => {
                setTableLoader(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    };

    useEffect(() => {
        if (columnsData) {
            columnsConfigurationHandel();
        }
        // return () => setColumns([]);
    }, [refresh, refresh || columnsData.length]);

    useEffect(() => {
        setSelectedRowKeys(defaultSelectedRows);
    }, [defaultSelectedRows.length]);

    const { styles } = useStyle();

    return columns.length > 0 || loader ? (
        <Table
            columns={columns}
            dataSource={rowData}
            rowKey={uniqueId}
            onRow={onRow}
            rowSelection={
                isRowSelection && {
                    selectedRowKeys,
                    onChange: onSelectChange,
                    fixed: true,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
                }
            }
            size={size}
            pagination={
                isPagination && {
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    onShowSizeChange: (current, size) => {
                        setPageSize(size);
                    },
                }
            }
            onChange={handleTableChange}
            scroll={{ ...scroll }}
            loading={{
                spinning: loader,
                indicator: <LoaderComponent />,
            }}
            className={`custom-table ${className} ${styles.customTable}`}
            style={{ ...style, fontSize: 10 }}
            rowClassName={rowClassName}
            summary={summary}
        />
    ) : (
        <Empty description="No Table Found" />
    );
};

export default DynamicTableComponent;

const renderSortMethods = (type, dataIndex) => {
    switch (type) {
        case "string":
            return (a, b) => (a[dataIndex] || "").localeCompare(b[dataIndex] || "");
        case "number":
            return (a, b) => Number(a[dataIndex]) - Number(b[dataIndex]);
        default:
            return (a, b) => a[dataIndex].localeCompare(b[dataIndex] || "");
    }
};
