const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const locationSchema = new Schema({
    place: {type: String},
    image: {type: String},
    description: {type: String},
    rackets: {type: Boolean, default: false},
    net: {type: String},
    barService: {type: Boolean, default: false},
    bookMatch: {type: mongoose.Schema.Types.ObjectId, ref: "User"} 
})

const Location = model("Location", locationSchema);

module.exports = Location;