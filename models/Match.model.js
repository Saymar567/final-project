const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const matchSchema = new Schema ({
    location: {type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true},
    day: {type: String, required: true},
    time: {type: Number, required: true},
    comment: {type: String, required: true}
});
const Match= model("Match", matchSchema)

module.exports= Match;