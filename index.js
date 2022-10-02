const express = require("express");
const cors = require("cors");
const svgBadge = require("./frontend/src/svgBadge");
const { port, mongourl } = require('./config.json');

// Create an express instance and setup middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/frontend/build'));

// Initilize mongoDB connection
const mongoose = require('mongoose');
const database = require('./database/mongo.js');
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB.'))
    .catch((err) => console.log('Unable to connect to MongoDB.\nError: ' + err));

// Disable caching
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revaluniqueIDate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

async function processSVG(req, res) {
    // Get values from query and parameter
    const labelBGColor = req.query.labelBGColor || "484848";
    const countBGColor = req.query.countBGColor || "1CA2F1";
    const labelTextColor = req.query.labelTextColor || "FFFFFF";
    const countTextColor = req.query.countTextColor || "FFFFFF";
    const shadow = req.query.shadow || "1";
    const label = req.query.label || "VISITS";
    const uniqueID = req.params.uniqueID;
    const swap = eq.query.swap || "0";

    // Get the current visits count
    const visits = await database.visitsBadge(uniqueID);

    // Create the SVG Badge
    let svg = swap === "0"
        ? svgBadge(label, shadow, labelBGColor, countBGColor, labelTextColor, countTextColor, visits)
        : svgBadge(visits, shadow, labelBGColor, countBGColor, labelTextColor, countTextColor, label);

    // Send the SVG Badge
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
}

app.get("/:uniqueID", (req, res) => processSVG(req, res));
app.listen(port, () => console.log(`Ready on port ${port}.`));