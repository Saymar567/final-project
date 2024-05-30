const mongoose = require("mongoose")
const {Schema,  model} = mongoose

const eventSchema = new Schema ({
    name: {type: String},
    date: {type: String},
    location: {type: String},
    level: {type: String, default: "amateur"},
    prize: {type: String, required: function(){return this.level === "pro"}}
})

const Event = model("Event", eventSchema);
module.exports = Event