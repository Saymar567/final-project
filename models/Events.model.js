const mongoose = require("mongoose")
const {Schema,  model} = mongoose

const eventSchema = new Schema ({
    name: {type: String},
    date: {type: String},
    location: {type: mongoose.Schema.Types.ObjectId, ref: "Location"},
    level: {type: String, default: "amateur"},
    prize: {type: String, required: function(){return this.level === "pro"}}
})

const Event = model("Event", eventSchema);
module.exports = Event