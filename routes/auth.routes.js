const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, name, location, image } = req.body;

  if (email === "" || password === "" || name === "" || location === "" || image === "") {
    res.status(400).json({ message: "Provide email, password, name, location, and image, please" });
    return;
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  
  const passwordRegex = /(?=.*\d)(?=.*[a-z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number and one lowercase letter.",
    });
    return;
  }

  
  User.findOne({ email })
    .then((foundUser) => {
     
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      
      return User.create({ email, password: hashedPassword, name, location, image });
    })
    .then((createdUser) => {
      
      const { email, name, location, _id, image } = createdUser;

     
      const user = { email, name, location, _id, image };

      
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); 
});


router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        
        res.status(401).json({ message: "User not found." });
        return;
      }

      
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
       
        const { _id, email, name, image } = foundUser;

        
        const payload = { _id, email, name, image };

        
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); 
});


router.get("/verify", isAuthenticated, (req, res, next) => {
  

 
  res.status(200).json(req.payload);
});

module.exports = router;
