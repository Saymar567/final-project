const express = require("express");
const router = express.Router();
const Match = require("../models/Match.model");


router.post("/", (req, res) => {
    
    Match.create(req.body)
        .then((data) => res.status(201).json({ message: "Match has been created!", data }))
        .catch((error) => res.status(400).json({message: "Oh oh, there has been a problem creating the match", error: error.message}))
})


router.get("/", (req, res) => {
    Match.find()
        .populate({ path: "participants", select: "name" })
        .populate({path: "createdBy", select: "name"})
        .populate({path: "location", select: "name"})
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: "Error retrieving matches", error }))

})


router.put("/cancel/:matchId", (req, res)=>{
    const {matchId} = req.params;
    
    Match.findByIdAndUpdate(matchId, {$pull: {participants: req.body.userId}}, {new: true})
    .then((data)=> res.json(data))
    .catch((error)=> res.json(error))
})


router.put("/:matchId", (req, res) => {
    const { matchId } = req.params;
    Match.findByIdAndUpdate(matchId, {$set: req.body, $push: {participants: req.body.userId}}, {new: true})
        .then((data) => res.json({ data }))
        .catch((error) => res.status(400).json({ message: "Error updating match", error }))
})


router.get("/:matchId", (req, res) => {
    const { matchId } = req.params;
    Match.findById(matchId)
        .populate("location")

        .then((data) => res.json({ data }))
        .catch((error) => res.status(400).json({ message: "Oops, looks like there's no match in here", error }))

})


router.delete("/:matchId/:userId", (req, res) => {
    const { matchId, userId } = req.params;
    console.log(req.body);
    Match.findById(matchId)
    .then((response)=> {
        console.log("CREATED BY", response.createdBy.toString());
        console.log("USER ID", userId);
        if(response.createdBy.toString() !== userId) {
            res.status(400).json({message: "You are not the one that created the match"})
            return;
        }
        return Match.findByIdAndDelete(matchId)
    })
    .then((deletedMatch)=> res.status(200).json(deletedMatch))
    .catch((error)=> res.json(error))
})


router.post("/signup", (req, res) => {
    const { matchId, userId, userName } = req.body;
    Match.findByIdAndUpdate(
        matchId,
        { $push: { participants: { userId, userName } } },
        { new: true }
    )
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ error: error.message }));
});


module.exports = router