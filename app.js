// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// In here we insert the user route to have access in the frontend to the collection of users from the database
const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes)

const matchRoutes = require("./routes/match.routes");
app.use("/matches", matchRoutes)

const locationRoutes = require("./routes/location.routes")
app.use("/locations", locationRoutes)

const eventRoutes = require("./routes/event.routes")
app.use("/events", eventRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
