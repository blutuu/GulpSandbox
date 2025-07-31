// console.time("excel-processing");
// const XLSX = require("xlsx");
// const fs = require("fs");
// const { act } = require("react");

// // Path to your Excel file
// const workbook = XLSX.readFile(
//   "process/resources/2024 Data for Calculator.xlsx"
// );

// // Get the first sheet name
// const sheetName = workbook.SheetNames[0];

// // Get the worksheet
// const worksheet = workbook.Sheets[sheetName];

// // Convert to JSON
// const data = XLSX.utils.sheet_to_json(worksheet);

// let blob = new Blob([JSON.stringify(data)]);
// // let link = document.createElement("a");

// //link.href = URL.createObjectURL(blob);

// fs.writeFile("output.json", JSON.stringify(data), function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("The file was saved!");
// });

// console.timeEnd("excel-processing");
const districtList = [
  {
    district: "Indian River",
    base: 0.2051,
    tenth: 0.2256,
    actual: 0.2136,
  },
  {
    district: "Laurel",
    base: 0.3189,
    tenth: 0.3508,
    actual: 0.3422,
  },
  {
    district: "Seaford",
    base: 0.3226,
    tenth: 0.3549,
    actual: 0.3537,
  },
  {
    district: "Milford",
    base: 0.292,
    tenth: 0.3212,
    actual: 0.3067,
  },
  {
    district: "Woodbridge",
    base: 0.3825,
    tenth: 0.4208,
    actual: 0.3824,
  },
  {
    district: "Cape Henlopen",
    base: 0.2111,
    tenth: 0.2322,
    actual: 0.2112,
  },
  {
    district: "Delmar",
    base: 0.3141,
    tenth: 0.3455,
    actual: 0.3705,
  },
];
let baseRate;
let tenthRate;
let actualRate;

const calculateTax = () => {
  console.log("Calculating tax...");
  // Get the form value
  const newAssessedValue = parseFloat(
    document.getElementById("new-assessed-value").value
  );
  const selectedDistrict = document.getElementById("school-district").value;

  console.log(selectedDistrict);

  const district = districtList.find((d) => d.district === selectedDistrict);
  if (district) {
    baseRate = district.base / 100;
    tenthRate = district.tenth / 100;
    actualRate = district.actual / 100;

    console.log(
      `Base Rate: ${baseRate}, Tenth Rate: ${tenthRate}, Actual Rate: ${actualRate}`
    );
  } else {
    console.error("District not found");
  }

  // Calculate the tax (assuming a tax rate of 10% for this example)
  const calculatedTaxRange = `${(newAssessedValue * baseRate).toFixed(2)} - ${(
    newAssessedValue * tenthRate
  ).toFixed(2)}`;
  const calculatedActualTax = `${(newAssessedValue * actualRate).toFixed(2)}`;

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  console.log(numberWithCommas(calculatedTaxRange));

  // Return the calculated value into the tax-range element
  document.getElementById("tax-range").innerText =
    numberWithCommas(calculatedTaxRange);

  document.getElementById("tax-rate").innerText =
    numberWithCommas(calculatedActualTax);
};
