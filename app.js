const express = require("express");
const app = express();

require("dotenv").config();
require("./db");
require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes)

const matchRoutes = require("./routes/match.routes");
app.use("/matches", matchRoutes)

const locationRoutes = require("./routes/location.routes")
app.use("/locations", locationRoutes)

const eventRoutes = require("./routes/event.routes")
app.use("/events", eventRoutes)


require("./error-handling")(app);


module.exports = app;
