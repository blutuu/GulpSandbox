const districtList = [
  {
    district: "Indian River",
    base: 0.2051,
    tenth: 0.2256,
  },
  {
    district: "Laurel",
    base: 0.3189,
    tenth: 0.3508,
  },
  {
    district: "Seaford",
    base: 0.3226,
    tenth: 0.3549,
  },
  {
    district: "Milford",
    base: 0.292,
    tenth: 0.3212,
  },
  {
    district: "Woodbridge",
    base: 0.3825,
    tenth: 0.4208,
  },
  {
    district: "Cape Henlopen",
    base: 0.2111,
    tenth: 0.2322,
  },
  {
    district: "Delmar",
    base: 0.3141,
    tenth: 0.3455,
  },
];
let baseRate;
let tenthRate;

const calculateTax = () => {
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

    console.log(`Base Rate: ${baseRate}, Tenth Rate: ${tenthRate}`);
  } else {
    console.error("District not found");
  }

  // Calculate the tax (assuming a tax rate of 10% for this example)
  const calculatedTaxRange = `${(newAssessedValue * baseRate).toFixed(2)} - ${(
    newAssessedValue * tenthRate
  ).toFixed(2)}`;

  console.log(numberWithCommas(calculatedTaxRange));

  // Return the calculated value into the tax-range element
  document.getElementById("tax-range").innerText =
    numberWithCommas(calculatedTaxRange);
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
