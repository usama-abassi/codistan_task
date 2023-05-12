const express = require("express");
const app = express();
var cors = require("cors");
const fs = require("fs");
app.use(cors());

// Read Parent data from Parent.json file
const parentData = JSON.parse(fs.readFileSync("Parent.json"));

// Read Child data from Child.json file
const childData = JSON.parse(fs.readFileSync("Child.json"));

// Group Child data by parentId
const childDataByParent = childData.data.reduce((acc, curr) => {
  acc[curr.parentId] = [...(acc[curr.parentId] || []), curr];
  return acc;
}, {});

// Add paidAmounts to Parent data
parentData.data.forEach((parent) => {
  const childRecords = childDataByParent[parent.id] || [];
  const totalPaidAmount = childRecords.reduce(
    (acc, curr) => acc + curr.paidAmount,
    0
  );
  parent.totalPaidAmount = totalPaidAmount;
});

app.get("/parent/data", (req, res) => {
  // Send the JSON data as a response
  res.json(parentData);
});

app.get("/child/data", (req, res) => {
  // Send the JSON data as a response
  res.json(childData);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
