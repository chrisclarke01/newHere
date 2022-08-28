const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const cors = require("cors");

require("dotenv").config({path: "./config.env"});

const authRoutes = require("./routes/authentication");
const { db } = require("./models/User");

//App definition
const app = express();

//DB connection
mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
})
.then(() => console.log("Connected to Database."));

//Middleware
app.use(express.json());
app.use(cors());

//Routing middleware
app.use("/api", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});