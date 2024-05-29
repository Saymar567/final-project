const express = require("express");
const router = express.Router();
const Location = require("../models/Location.model");

router.post("/locations", (req, res)=>{
    Location.create(req.body)
    .then((data)=>res.status(200).json({data}))
    .catch((error)=>res.status(400).json(error))
})




module.exports = router