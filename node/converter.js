console.time("excel-processing");
const XLSX = require("xlsx");
const fs = require("fs");
const Transform = require("stream").Transform;
const csv = require("csvtojson");

// Path to your Excel file
// const workbook = XLSX.readFile("process/resources/test data.xlsx");

// // Get the first sheet name
// const sheetName = workbook.SheetNames[0];
// console.log(sheetName);

// // Get the worksheet
// const worksheet = workbook.Sheets[sheetName];

// // Convert to JSON
// const data = XLSX.utils.sheet_to_json(worksheet);

// console.log(data[0]);

// fs.writeFile("output.json", JSON.stringify(data), function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("The file was saved!");
// });

const csvFilePath = "process/resources/2025_tax_data.csv";

// const jsonArray = csv().fromFile(csvFilePath);

// fs.writeFile("output.json", JSON.stringify(jsonArray), function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("The file was saved!");
// });

/**
 * Searches a JSON file for an object with a specific attribute value.
 * @param {string} filePath - Path to the JSON file.
 * @param {string} attribute - Attribute name to search for.
 * @param {*} value - Value to match.
 * @returns {object|null} - The found object or null if not found.
 */
function findObjectByAttribute(filePath, attribute, value) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (Array.isArray(data)) {
    return data.find((obj) => obj[attribute] == value) || null;
  }
  return null;
}

// Example usage:
const result = findObjectByAttribute(
  "output.json",
  "txre_parcel_id",
  "532-19.00-2.02"
);
console.log(result);

console.timeEnd("excel-processing");
