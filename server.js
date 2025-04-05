const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Translation API
app.post("/translate", async (req, res) => {
  const { text, from, to } = req.body;

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: "text"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    res.json({ translatedText: data.translatedText });
  } catch (err) {
    console.error("Translation error:", err);
    res.status(500).json({ error: "Translation failed" });
  }
});

// Fallback route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log('Translation server running on http://localhost:${PORT}');
});
