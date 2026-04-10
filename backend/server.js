const Data = require("./models/Data");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use environment variable (Render + MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working");
});

// GET API
app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST API (ADD)
app.post("/api/data", async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
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

// DELETE
app.delete("/api/data/:id", async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Use dynamic port (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});