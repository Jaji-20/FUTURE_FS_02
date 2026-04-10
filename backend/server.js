const Data = require("./models/Data");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/crm")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: {
    type: String,
    default: "New"
  },
  notes: String
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working");
});

// GET API
app.get("/api/data", async (req, res) => {
  console.log("GET API CALLED"); // debug
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST API
app.put("/api/data/:id", async (req, res) => {
  try {
    const updated = await Data.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/data/:id", async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/data", async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const newData = new Data({
      name: req.body.name,
      email: req.body.email,
      status: req.body.status || "New",
      notes: req.body.notes
    });

    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("API Working");
});
// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});