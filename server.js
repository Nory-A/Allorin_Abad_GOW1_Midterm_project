require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

console.log("Node version:", process.version);
console.log("Key loaded:", process.env.API_KEY ? "yes (" + process.env.API_KEY.length + " chars)" : "NO");

app.get("/api/define/:word", async (req, res) => {
    const word = encodeURIComponent(req.params.word);
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.API_KEY}`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        console.log("Merriam-Webster status:", response.status);
        console.log("Response preview:", text.slice(0, 200));

        try {
            res.json(JSON.parse(text));
        } catch {
            res.status(502).json({ error: "Merriam-Webster said: " + text });
        }
    } catch (err) {
        console.error("Server fetch failed:", err);
        res.status(500).json({ error: "Server could not reach Merriam-Webster: " + err.message });
    }
});

module.exports = app;