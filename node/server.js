const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/api/gettaxdata", (req, res) => {
  const directoryPath = path.join(__dirname, "../process/resources");
  const filePath = path.join(directoryPath, "output_0.1.json");

  console.log(directoryPath);

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    return res.json(JSON.parse(data));
  } else {
    return res.status(404).send("Tax data file not found.");
  }

  res.status(200).send("Tax data endpoint hit successfully!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
