"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;
app.listen(PORT, function appStarted() {
    console.log("Listening on " + PORT + " port.");
});
