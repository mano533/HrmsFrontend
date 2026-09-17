import React, { useContext, useEffect, useMemo, useState } from "react";
import { HolderOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { createStyles } from "antd-style";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Table } from "antd";
const RowContext = React.createContext({});

 
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

const DragHandle = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};
const columns = [
  { key: "sort", align: "center", width: 80, render: () => <DragHandle /> },
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
  { title: "Address", dataIndex: "address" },
];
const initialData = [
  { key: "1", name: "John Brown", age: 32, address: "Long text Long" },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park" },
  { key: "3", name: "Joe Black", age: 32, address: "Sidney No. 1 Lake Park" },
];
const Row = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });
  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };
  const contextValue = useMemo(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );
  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const DragAndDropTableComponent = ({
  rowData = [],
  columns = [],
  rowKey,
  onChange,
  loading,
  style,
  rowClassName,
  className,
  scroll

}) => {
  console.log("rowData", rowData);
const { styles } = useStyle(); 
  const [dataSource, setDataSource] = useState([]);
  console.log("rowid", dataSource);

  const finalColumns = [
    { key: "sort", align: "center", width: 80, render: () => <DragHandle /> },
    ...columns,
  ];
  // { key: "sort", align: "center", width: 80, render: () => <DragHandle /> },
  console.log("finalColumns", finalColumns);

  const onDragEnd = ({ active, over }) => {
    if (!over) return;
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record[rowKey] === active?.id,
        );
        const overIndex = prevState.findIndex(
          (record) => record[rowKey] === over?.id,
        );
        let newData = arrayMove(prevState, activeIndex, overIndex);

        if (onChange) {
          onChange(newData); // return reordered data
        }

        return newData;
      });
    }
  };
  useEffect(() => {
    setDataSource(rowData);
  }, [rowData]);
  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        items={dataSource.map((i) => i[rowKey])}
        strategy={verticalListSortingStrategy}
      >
        <Table
          rowKey={rowKey}
          loading={loading}
          components={{ body: { row: Row } }}
          columns={finalColumns}
          dataSource={dataSource}
           style={{ ...style, fontSize: 10 }}
          rowClassName={rowClassName}
           className={`custom-table ${className} ${styles.customTable}`}
          scroll={{ ...scroll }}
        />
      </SortableContext>
    </DndContext>
  );
};
export default DragAndDropTableComponent;
