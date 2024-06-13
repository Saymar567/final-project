const express = require("express");
const morgansito = express.Router();
const User = require("../models/User.model")

morgansito.get("/", (req, res)=>{ 
    User.find(req.body)
    .select('-password')
    .then((data)=>{
        res.json(data)})
    .catch((error)=>res.json(error))
})


morgansito.put("/:userId", (req, res)=>{
    const {userId} = req.params;
    User.findByIdAndUpdate(userId, req.body, {new: true})
    .then((data)=>{
        const {name, location, phoneNumber, description, image, _id} = data
        const user = {name, location, phoneNumber, description, image, _id}
        res.status(200).json({message:"Changes were made in your profile!", user: user})})
    .catch((error)=>res.json(error))
})

morgansito.get("/:userId", (req, res)=>{ 
    const {userId} = req.params
    const user = {name, location, phoneNumber, description, image}
    User.findById(userId)
    .then((data)=>{
        const {mail, name, location, rank, phoneNumber, description, image} = data
        res.json({mail, name, location, rank, phoneNumber, description, image})
    })
    .catch((error)=>res.json(error))
})



morgansito.delete("/:userId", (req, res)=>{ 
    const {userId} = req.params;
    const {name, location, phoneNumber, description, image} = req.body;
    User.findByIdAndDelete(userId, req.body)
    .then((data)=>res.json(data))
    .catch((error)=>res.json("there was some error in deleting the user", error))
})

module.exports = morgansito