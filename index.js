const express = require('express');
const cors = require('cors');
const Visits = require('./mongodb');

const app = express();
app.use(express.json());
app.use(cors());

async function sendSVG(req, res) {
    const visitsBG = req.query.visitsBG || '555555';
    const countBG = req.query.countBG || 'A2C93E';
    const visitsText = req.query.visitsText || 'FFFFFF';
    const countText = req.query.countText || 'FFFFFF';
    const textShadow = req.query.textShadow || '1';

    const userName = req.params.userName;
    const visit = await Visits
        .findOneAndUpdate({ userName: userName }, { $inc: { visits: 1 } }, { new: true })
        .select({ visits: 1 });
    let visits = 1;
    if (visit != null)
        visits = visit.visits;
    else {
        const visit = new Visits({
            userName: userName,
            visits: 1,
        });
        await visit.save();
    }
    let width = 54 + ((visits.toString().length - 1) * 5.2);
    const shadow = `
    <text transform="matrix(1 0 0 1 6.5 14.8)" fill="#000000" opacity="0.3" font-family="'Arial'" font-size="10px">VISITS</text>
    <text transform="matrix(1 0 0 1 49.5 14.8)" fill="#000000" opacity="0.3" font-family="'Arial'" font-size="10px">${visits}</text>
    `
    let svg = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 ${width + 7.17} 20" enable-background="new 0 0 ${width + 7.17} 20" xml:space="preserve">
<path fill="#${countBG}" d="M${width + 3.59},20H3.59C1.61,20,0,18.39,0,16.41V3.59C0,1.61,1.61,0,3.59,0h${width}c1.98,0,3.59,1.61,3.59,3.59v12.83
	C${width + 7.17},18.39,${width + 5.57},20,${width + 3.59},20z"/>
<path fill="#${visitsBG}" d="M44.3,0v20H3.77C1.69,20,0,18.39,0,16.41V3.59C0,1.61,1.69,0,3.77,0H44.3z"/>
${(textShadow == 1) ? shadow : ''}
<text transform="matrix(1 0 0 1 6.5 13.6)" fill="#${visitsText}" font-family="'Arial'" font-size="10px">VISITS</text>
<text transform="matrix(1 0 0 1 49.5 13.6)" fill="#${countText}" font-family="'Arial'" font-size="10px">${visits}</text>
</svg>
    `;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
}

app.get('/:userName', (req, res) => {
    sendSVG(req, res);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Running on port ${port}...`));