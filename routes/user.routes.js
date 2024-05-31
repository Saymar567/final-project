const express = require("express");
const morgansito = express.Router();
const User = require("../models/User.model")

morgansito.get("/", (req, res)=>{ //We deconstruct the body not to display the password
    const {mail, name, location, rank, phoneNumber, description, image} = req.body
    User.find(req.body)
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})

//To make changes in the user information

morgansito.put("/:userId", (req, res)=>{
    const {userId} = req.params;
    const {name, location, phoneNumber, description, image} = req.body;
    User.findByIdAndUpdate(userId, req.body, {new: true})
    .then((data)=>res.status(200).json({message:"Changes were made in your profile!", data}))
    .catch((error)=>res.json(error))
})

morgansito.get("/:userId", (req, res)=>{ 
    const {userId} = req.params
    User.findById(userId)
    .then((data)=>{
        const {mail, name, location, rank, phoneNumber, description, image} = data
        res.json({mail, name, location, rank, phoneNumber, description, image})
    })
    .catch((error)=>res.json(error))
})

//To delete the user (it's a pitty)

morgansito.delete("/:userId", (req, res)=>{ //doubt: to delete a user do we have to display in here the password? it would be a breach in the security, ask Marcel
    const {userId} = req.params;
    const {name, location, phoneNumber, description, image} = req.body;
    User.findByIdAndDelete(userId, req.body)
    .then((data)=>res.json(data))
    .catch((error)=>res.json("there was some error in deleting the user", error))
})

module.exports = morgansito