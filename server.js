const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AccidentReport = require("./models/AccidentReport");
const Appointment = require("./models/Appointment");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/crashreport")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
    res.send("CrashReport Backend Running");
});

// API to submit accident report
app.post("/report", async (req, res) => {
    try {
        const report = new AccidentReport(req.body);
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/reports", async (req, res) => {
    try {
        const reports = await AccidentReport.find().sort({date:-1}).limit(5);
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/update-status/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const updatedReport = await AccidentReport.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    res.json(updatedReport);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

app.post("/appointment", async (req, res) => {

  try {

    const appointment = new Appointment(req.body);
    await appointment.save();

    res.status(201).json(appointment);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

app.get("/stats", async (req, res) => {

  try {

    const total = await AccidentReport.countDocuments();

    const pending = await AccidentReport.countDocuments({ status: "Pending" });

    const dispatched = await AccidentReport.countDocuments({ status: "Ambulance Dispatched" });

    const resolved = await AccidentReport.countDocuments({ status: "Resolved" });

    res.json({
      total,
      pending,
      dispatched,
      resolved
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});