const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
require('dotenv').config();

mongoose.connect(process.env.MONGOOB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 
mongoose.connection.on('connected', () => console.log('Mongodb connected'))
const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "client/build")));
 
app.use('/api/user', require('./controllers/User'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build/index.html"));
});

app.listen(5000, () => console.log('Server started'));
