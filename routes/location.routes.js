const express = require("express");
const router = express.Router();
const Location = require("../models/Location.model");

router.post("/", (req, res)=>{
    Location.create(req.body)
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(400).json(error))
})
router.get("/", (req, res)=>{
    Location.find()
    .then((data)=>res.json(data))
    .then((error)=>res.json(error))
})



module.exports = router