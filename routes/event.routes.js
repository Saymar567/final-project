const express = require("express");
const router = express.Router();
const Event = require("../models/Events.model")

router.get("/", (req, res)=>{
    Event.find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})
router.post("/", (req, res)=>{
    Event.create(req.body)
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})

router.delete("/:eventId", (req, res)=>{
    const {eventId} = req.params
    Event.findByIdAndDelete(eventId)
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})

router.put("/:eventId", (req, res)=>{
    const {eventId} = req.params
    Event.findByIdAndUpdate(eventId)
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})

module.exports = router