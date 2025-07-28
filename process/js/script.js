console.time("excel-processing");
const XLSX = require("xlsx");
const fs = require("fs");

// Path to your Excel file
const workbook = XLSX.readFile(
  "process/resources/2024 Data for Calculator.xlsx"
);

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Get the worksheet
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

let blob = new Blob([JSON.stringify(data)]);
// let link = document.createElement("a");

//link.href = URL.createObjectURL(blob);

fs.writeFile("output.json", JSON.stringify(data), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

console.timeEnd("excel-processing");
