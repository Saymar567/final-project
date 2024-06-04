const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    name: { type: String },
    place: { type: String },
    image: { type: String },
    description: { type: String },
    rackets: { type: Boolean, default: false },
    net: { type: String },
    barService: { type: Boolean, default: false },
    horarios: [{
        horaInicio: { type: String },
        horaFin: { type: String },
        reserved: { type: Boolean, default: false },
        reservedby: {type: String, default: ""}
    }]
});

const Location = model("Location", locationSchema);

module.exports = Location;