require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require("./routes/auth");
const allRoutes = require("./routes/allRoutes");

// databse connection 
connection();  


//midlewares
app.use(express.json())
app.use(cors());

// routes 
app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/all", allRoutes);

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));
