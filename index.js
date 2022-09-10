const express = require("express");
const cors = require("cors");
const Visits = require("./mongodb");
const svgBadge = require("./frontend/src/svgBadge");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/frontend/build'));

// Disable caching
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

async function processSVG(req, res) {
    // Getting values from query
    const visitsBG = req.query.visitsBG || "484848";
    const countBG = req.query.countBG || "2574EA";
    const visitsText = req.query.visitsText || "FFFFFF";
    const countText = req.query.countText || "FFFFFF";
    const textShadow = req.query.textShadow || "1";
    const visitsValue = req.query.textContent || "VISITS";
    const userName = req.params.userName;

    // Database Operations
    const visit = await Visits.findOneAndUpdate(
        { userName: userName },
        { $inc: { visits: 1 } },
        { new: true }
    ).select({ visits: 1 });
    let visits = 1;
    if (visit != null) visits = visit.visits;
    else {
        const visit = new Visits({
            userName: userName,
            visits: 1,
        });
        await visit.save();
    }

    // Creating the SVG Badge
    const svg = svgBadge(visitsValue, textShadow, visitsBG, countBG, visitsText, countText, visits);

    // Sending the SVG Badge
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
}

app.get("/:userName", (req, res) => processSVG(req, res));
app.listen(port, () => console.log(`Running on port ${port}...`));