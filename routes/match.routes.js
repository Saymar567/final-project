const express = require("express");
const router = express.Router();
const Match = require("../models/Match.model");

//We use the POST method to create a match with the properties checked in the model

router.post("/", (req, res) => {
    Match.create(req.body)
        .then((data) => res.status(201).json({ message: "Match has been created!", data }))
        .catch((error) => res.status(400).json("Oh oh, there has been a problem creating the match", error))
})

//This is to GET the information of the matches created

router.get("/", (req, res) => {
    const { matchId } = req.params;
    Match.find()
        .then((data) => res.json({ data }))
        .catch((error) => res.status(400).json({ message: "Error retrieving matches", error }))

})

//If we want to change some information of the match, we use the PUT method

router.put("/:matchId", (req, res) => {
    const { matchId } = req.params;
    Match.findByIdAndUpdate(matchId, req.body, { new: true })
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

module.exports = router