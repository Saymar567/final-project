const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const matchSchema = new Schema ({
    location: {type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true},
    day: {type: String, required: true},
    time: {type: String, required: true},
    comment: {type: String, required: true},
    pairs: {type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    participants: [
        
        {type: mongoose.Schema.Types.ObjectId, ref: "User" }
        
    ]
    
});
const Match= model("Match", matchSchema)

module.exports= Match;