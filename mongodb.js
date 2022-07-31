const mongoose = require('mongoose');
// const mongoDBLink = 'mongodb://localhost';
const mongoDBLink = process.env.MONGO;

mongoose.connect(mongoDBLink + 'visitscounter')
    .then(() => console.log('Connected to mongodb...'))
    .catch((err) => console.error('Couldnot connect to mongodb...', err));

const visitSchema = new mongoose.Schema({
    userName: String,
    visits: Number,
});

const Link = mongoose.model('visits', visitSchema);
module.exports = Link;