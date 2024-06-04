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
    .catch((error)=>res.json(error))
})


router.put("/:locationId", async (req, res) => {
    const { locationId } = req.params;
    try {
        const location = await Location.findByIdAndUpdate(locationId, req.body, { new: true });
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
