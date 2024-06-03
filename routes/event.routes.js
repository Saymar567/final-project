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

//In the routes where we update (PUT) if we want it to return the updated object, not the old one, we need to add another argument, the "new" thing, which gives us he NEW one in the response, not the old one.

router.put("/:eventId", (req, res)=>{
    const {eventId} = req.params
    Event.findByIdAndUpdate(eventId, req.body, {new: true})
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})

router.post("/signup", (req, res) => {
    const { eventId, userId, userName } = req.body;
    Event.findByIdAndUpdate(
        eventId,
        { $push: { participants: { userId, userName } } },
        { new: true }
    )
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ error: error.message }));
});

router.post("/cancel", (req, res) => {
    const { eventId, userId } = req.body;
    Event.findByIdAndUpdate(
        eventId,
        { $pull: { participants: { userId: userId } } },
        { new: true }
    )
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;