const mongoose = require("mongoose")
const {Schema,  model} = mongoose

const eventSchema = new Schema ({
    name: {type: String},
    date: {type: String},
    location: {type: String},
    level: {type: String, default: "amateur"},
    prize: {type: String, required: function(){return this.level === "pro"}},
    participants: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            userName: String
        }
    ]
})

const Event = model("Event", eventSchema);
module.exports = Event