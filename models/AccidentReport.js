const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    injuryLevel: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("AccidentReport", accidentSchema);