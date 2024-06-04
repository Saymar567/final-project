const express = require("express");
const router = express.Router();
const Match = require("../models/Match.model");

//We use the POST method to create a match with the properties checked in the model

router.post("/", (req, res) => {
    console.log(req.body);
    Match.create(req.body)
        .then((data) => res.status(201).json({ message: "Match has been created!", data }))
        .catch((error) => res.status(400).json({message: "Oh oh, there has been a problem creating the match", error: error.message}))
})

//This is to GET the information of the matches created

router.get("/", (req, res) => {
    Match.find()
        .populate({ path: "participants", select: "name" })
        .populate({path: "location", select: "name"})
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: "Error retrieving matches", error }))

})

//If we want to change some information of the match, we use the PUT method

router.put("/cancel/:matchId", (req, res)=>{
    const {matchId} = req.params;
    console.log(matchId)
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

//If we want to get information from a single match, wit the GET method

router.get("/:matchId", (req, res) => {
    const { matchId } = req.params;
    Match.findById(matchId)
        .populate("location")

        .then((data) => res.json({ data }))
        .catch((error) => res.status(400).json({ message: "Oops, looks like there's no match in here", error }))

})

//If we want to delete the match created, we use the DELETE method

router.delete("/:matchId", (req, res) => {
    const { matchId } = req.params;
    Match.findByIdAndDelete(matchId)
        .then((data) => res.status(204).json({ data }))
        .catch((error) => res.status(400).json({ message: "Error deleting match", error }))
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