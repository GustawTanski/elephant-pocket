import express = require("express");

const app: express.Application = express();

const PORT = process.env.PORT || 3001;

app.get("/", function bareGet(req, res) {
    res.send("Hello World!");
});

app.listen(PORT, function appStarted() {
    console.log(`Listening on ${PORT} port...`);
});

module.exports = app;