const express = require("express");
const router = express.Router();
const Match = require("../models/Match.model");

//We use the POST method to create a match with the properties checked in the model

router.post("/matches", (req, res)=>{
    Match.create(req.body)
    .then((data)=> res.status(200).json("Match has been created!", {data}))
    .catch((error)=> res.status(400).json("Oh oh, there has been a problem creating the match", error))
})

//This is to GET the information of the matches created

router.get("/matches/", (req, res)=>{
const {matchId} = req.params;
    Match.find()
    .then((data)=>res.json({data}))
    .catch((error)=>res.json(error))
})

//If we want to change some information of the match, we use the PUT method

router.put("/matches/:matchId", (req, res)=>{
    const {matchId} = req.params;
    Match.findByIdAndUpdate(matchId, req.body, {new: true})
    .then((data)=>res.json({data}))
    .catch((error)=>res.json(error))
})

//If we want to delete the match created, we use the DELETE method

router.delete("/matches/:matchId", (req, res)=>{
    const {matchId} = req.params;
    Match.findByIdAndDelete(matchId)
    .then((data)=>res.status(204).json({data}))
    .catch((error)=>res.json(error))
})

module.exports = router