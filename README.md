#README

##Introduction

Welcome to the backstage of De-Ping-A-Pong application.

##Table of contents

- Technologies
- Knowledgments
- License

##Technologies
- MongoDB
- Node.js
- Mongoose
- Express
- BCrypt
- Salt
- JWT

MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need. We used it to store different collections of data to deploy in the front-end.

Node.js is a framework that helps to write JavaScript outside of the browser.

Mongoose is a Node.js based Object Data Modeling (ODM) library for MongoDB.

Express is a lightweight and flexible routing framework with minimal core features meant to be augmented through the use of Express middleware modules

Both Mongoose and Express help to connect the back-end with the front-end.

We have used Bcrypt and Salt to encrypt the passwords, and JWT to get the tokens to store them and give access to the app functionalities to those who are logged-in.

We have used routes that allow to perform the CRUD (create, read, update, delete) method.

For users:
- Sign-up: router.post("/signup", (req, res, next) => {
  const { email, password, name, location, image } = req.body})
- Login: router.post("/login", (req, res, next) => {
  const { email, password } = req.body})

For events:
- GET event info: router.get("/", (req, res)=>{
    Event.find()
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})
- CREATE event: router.post("/", (req, res)=>{
    Event.create(req.body)
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})

- DELETE event: router.delete("/:eventId", (req, res)=>{
    const {eventId} = req.params
    Event.findByIdAndDelete(eventId)
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})
- UPDATE event info: router.put("/:eventId", (req, res)=>{
    const {eventId} = req.params
    Event.findByIdAndUpdate(eventId, req.body, {new: true})
    .then((data)=>res.json(data))
    .catch((error)=>res.json(error))
})
- JOIN and CANCEL booking in the event: router.post("/signup", (req, res) => {
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

For locations:

- GET, CREATE and UPDATE the info about the locations:
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

For matches:

- CREATE, READ, UPDATE and DELETE matches, as well as joining and cancelling the booking in them.
- Just the person that creates the match can edit the info.
 router.post("/", (req, res) => {
    console.log(req.body);
    Match.create(req.body)
        .then((data) => res.status(201).json({ message: "Match has been created!", data }))
        .catch((error) => res.status(400).json({message: "Oh oh, there has been a problem creating the match", error: error.message}))
})

//This is to GET the information of the matches created

router.get("/", (req, res) => {
    Match.find()
        .populate({ path: "participants", select: "name" })
        .populate({path: "createdBy", select: "name"})
        .populate({path: "location", select: "name"})
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: "Error retrieving matches", error }))

})

//If we want to change some information of the match, we use the PUT method
router.put("/cancel/:matchId", (req, res)=>{
    const {matchId} = req.params;
    console.log(matchId)
    Match.findByIdAndUpdate(matchId, {$pull: {participants: req.body.userId}}, {new: true})
    .then((data)=> res.json(data))
    .catch((error)=> res.json(error))
})




router.put("/:matchId", (req, res) => {
    const { matchId } = req.params;
    Match.findByIdAndUpdate(matchId, {$set: req.body, $push: {participants: req.body.userId}}, {new: true})
        .then((data) => res.json({ data }))
        .catch((error) => res.status(400).json({ message: "Error updating match", error }))
})

//If we want to get information from a single match, wit the GET method

router.get("/:matchId", (req, res) => {
    const { matchId } = req.params;
    Match.findById(matchId)
        .populate("location")

        .then((data) => res.json({ data }))
        .catch((error) => res.status(400).json({ message: "Oops, looks like there's no match in here", error }))

})

//If we want to delete the match created, we use the DELETE method

router.delete("/:matchId/:userId", (req, res) => {
    const { matchId, userId } = req.params;
    console.log(req.body);
    Match.findById(matchId)
    .then((response)=> {
        console.log("CREATED BY", response.createdBy.toString());
        console.log("USER ID", userId);
        if(response.createdBy.toString() !== userId) {
            res.status(400).json({message: "You are not the one that created the match"})
            return;
        }
        return Match.findByIdAndDelete(matchId)
    })
    .then((deletedMatch)=> res.status(200).json(deletedMatch))
    .catch((error)=> res.json(error))
})


router.post("/signup", (req, res) => {
    const { matchId, userId, userName } = req.body;
    Match.findByIdAndUpdate(
        matchId,
        { $push: { participants: { userId, userName } } },
        { new: true }
    )
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ error: error.message }));
});

###Creators:
Arnaldo Mera Rojas
Miguel Ángel Jiménez Calcedo

###Acknowledgments:
Marcel Bosch Espín (mentor)
Álvaro Sarría Rico (coworker-friend)
Lee Kiowa Roy Fiala Grau (coworker-friend)
Carlos Mera Rojas (UX/UI department)


 