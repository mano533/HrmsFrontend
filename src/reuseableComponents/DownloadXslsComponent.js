import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const  downloadTableAsXLSX = async (columns, data, fileName = "table-data") => {
  if (!data) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Add header row
  const headerRow = worksheet.addRow(columns.map(col => col.title));

  // Style header row
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFDCDCDC" }, // Light gray background
    };
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Add data rows
  data.forEach((row) => {
    worksheet.addRow(columns.map(col => row[col.dataIndex]));
  });

  // Adjust column widths
  columns.forEach((col, index) => {
    const maxLength = Math.max(
      col.title.length,
      ...data.map((d) => String(d[col.dataIndex] || "").length)
    );
    worksheet.getColumn(index + 1).width = maxLength + 2;
  });

  // Write workbook to buffer
  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};


export const generateColumnsFromData = (dataArray) => {
  if (!dataArray?.length) return [];
  return Object.keys(dataArray[0]).map((key) => ({
    title: key,
    dataIndex: key,
  }));
};
