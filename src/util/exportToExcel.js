/** @format */

import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

export const exportToExcel = (excelData, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
