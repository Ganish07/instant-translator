const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Translation endpoint
app.post("/translate", async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !sourceLang || !targetLang) {
    return res.status(400).json({ error: "Missing translation data." });
  }

  try {
    const response = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text"
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error("Translation error:", error.message);
    res.status(500).json({ error: "Translation failed." });
  }
});

// Fun fact endpoint
app.get("/fun-fact", async (req, res) => {
  try {
    const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
    res.json({ fact: response.data.text });
  } catch (error) {
    console.error("Fun fact error:", error.message);
    res.status(500).json({ error: "Could not fetch fun fact." });
  }
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:${PORT}');
});
