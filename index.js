const express = require('express');
const cors = require('cors');
const Visits = require('./mongodb');

const app = express();
app.use(express.json());
app.use(cors());

async function sendSVG(req, res) {
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
    let svg = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 89.01 20" enable-background="new 0 0 89.01 20" xml:space="preserve">
<path fill="#A2C93E" d="M85.43,20H3.59C1.61,20,0,18.39,0,16.41V3.59C0,1.61,1.61,0,3.59,0h81.84c1.98,0,3.59,1.61,3.59,3.59v12.83
	C89.01,18.39,87.41,20,85.43,20z"/>
<path fill="#555555" d="M44.3,0v20H3.77C1.69,20,0,18.39,0,16.41V3.59C0,1.61,1.69,0,3.77,0H44.3z"/>
<text transform="matrix(1 0 0 1 6.5 13.6)" fill="#FFFFFF" font-family="'Arial'" font-size="10px">VISITS</text>
<text transform="matrix(1 0 0 1 49.5 13.6)" fill="#FFFFFF" font-family="'Arial'" font-size="10px">${visits}</text>
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