const taxDataPath = "output.json";

let taxData = null;
let parcel = null;
let parcelData = null;
let lookupButton = document.getElementById("search-button");
let tax24 = document.getElementById("2024-tax-bill");
let tax25 = document.getElementById("2025-tax-bill");
let taxDifference = document.getElementById("tax-difference");
let schoolChange = document.getElementById("school-tax-changes");
let countyChange = document.getElementById("county-tax-changes");
let otherCharges = document.getElementById("other-charges");
let cumulativeChange = document.getElementById("cumulative-changes");
let reassessmentImpact = document.getElementById("reassessment-impact");
let reassessmentApprox = document.getElementById("reassessment-approx");
let taxRateApprox = document.getElementById("tax-rate-approx");
let taxRateImpact = document.getElementById("tax-rate-impact");
let combinedChange = document.getElementById("combined-change");

const getTaxData = async () => {
  let url = "http://localhost:8000/api/gettaxdata";

  await fetch(url)
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then((data) => {
      taxData = data;
    })
    .catch((err) => {
      console.error("Failed to read tax data:", err);
    });

  return taxData;
};

const setTaxData = async () => {
  if (taxData === null) {
    taxData = await getTaxData();
    console.log(taxData);
    enableSearch();
    hideLoadingPopup();
  }

  return taxData;
};

const lookupParcel = () => {
  parcel = document.getElementById("parcel-number").value;

  disableSearch();
  showLoadingPopup();

  setTaxData()
    .then((data) => {
      if (Array.isArray(data)) {
        parcelData =
          data.find((obj) => obj["txre_parcel_id"] == parcel) || null;

        setTimeout(() => {
          console.log(parcelData);
          enableSearch();
          hideLoadingPopup();
        }, 1000);

        return parcelData;
      }
    })
    .then((data) => {
      tax24.textContent = data["2024_Total_Net"];
      tax25.textContent = data["2025_Total_Net"];
      taxDifference.textContent = data["net_difference"];
      schoolChange.textContent = data["school_change"];
      countyChange.textContent = data["county_change"];
      otherCharges.textContent = data["other_charges"];
      cumulativeChange.textContent = data["combined_change"];
      reassessmentImpact.textContent = data["reassessment_impact"];
      reassessmentApprox.textContent = data["reassessment_approx"];
      taxRateApprox.textContent = data["tax_rate_approx"];
      taxRateImpact.textContent = data["rate_impact"];
      combinedChange.textContent = data["combined_change"];
    })
    .catch((err) => {
      showLookupError();
      console.log("Problem retrieving parcel" + err);
    });
};

const disableSearch = () => {
  lookupButton.textContent = "Loading...";
  lookupButton.disabled = true;
};

const enableSearch = () => {
  lookupButton.textContent = "Lookup";
  lookupButton.disabled = false;
};

// Function to show the loading popup
const showLoadingPopup = () => {
  document.getElementById("loadingOverlay").style.display = "flex";
};

// Function to hide the loading popup
const hideLoadingPopup = () => {
  document.getElementById("loadingOverlay").style.display = "none";
};

const showLookupError = () => {
  document.getElementById("lookup-error").classList.add("showError");

  setTimeout(() => {
    hideLookupError();
  }, 3000);
};

const hideLookupError = () => {
  document.getElementById("lookup-error").classList.remove("showError");
};
