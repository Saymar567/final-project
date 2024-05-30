const express = require("express");
const router = express.Router();
const Event = require("../models/Events.model")

router.get("/", (req, res)=>{
    Event.find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})

module.exports = router