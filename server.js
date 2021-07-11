// server/index.js
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src *; media-src *; img-src *");
    res.setHeader("Content-Type-Options", "")
    return next();
});

app.use(express.static(__dirname + "/client"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/test.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});