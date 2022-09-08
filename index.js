const express = require("express");
const cors = require("cors");
const Visits = require("./mongodb");
const Helpers = require("./helpers");

const approxWidth = Helpers.approxWidth;
const shadowColor = Helpers.shadowColor;
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
    const visitsBG = req.query.visitsBG || "555555";
    const countBG = req.query.countBG || "A2C93E";
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

    // Calculating text widths
    let visitsWidth = 10 + (approxWidth(visitsValue)) * 10;
    let countWidth = 10 + (approxWidth(visits.toString())) * 10;

    // Text shadow template
    let shadow = (textShadow == 1) ? `
    <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} 14.8206)" fill="${shadowColor(countBG)}" font-family="Arial" font-size="10px">${visits}</text>
    <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} 14.1597)" fill="${shadowColor(countBG)}" font-family="Arial" font-size="10px">${visits}</text>
    <text transform="matrix(1 0 0 1 7.0189 14.8425)" fill="${shadowColor(visitsBG)}" font-family="Arial" font-size="10px">${visitsValue}</text>
    <text transform="matrix(1 0 0 1 7.038 14.1817)" fill="${shadowColor(visitsBG)}" font-family="Arial" font-size="10px">${visitsValue}</text>
    `: '';

    // Main svg template
    let svg = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ${visitsWidth + countWidth + 7.5} 20" xml:space="preserve">
    <g id="badge">
        <path fill="#${visitsBG}" d="M46.11,20H4c-2.21,0-4-1.79-4-4V4c0-2.21,1.79-4,4-4h${visitsWidth}V20z"/>
        <path fill="#${countBG}" d="M46.11,20H${visitsWidth + countWidth + 3.5}c2.21,0,4-1.79,4-4V4c0-2.21-1.79-4-4-4H${visitsWidth + 4}V20z"/>
        ${shadow}
        <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} ${(textShadow == 1) ? '13.4559' : '13.8'})" fill="#${countText}" font-family="Arial" font-size="10px">${visits}</text>
        <text transform="matrix(1 0 0 1 7.038 ${(textShadow == 1) ? '13.4559' : '13.8'})" fill="#${visitsText}" font-family="Arial" font-size="10px">${visitsValue}</text>
    </g>
    </svg>
    `;

    // Send svg
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
}

app.get("/:userName", (req, res) => processSVG(req, res));
app.listen(port, () => console.log(`Running on port ${port}...`));