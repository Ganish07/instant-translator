const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // For frontend files

app.post("/translate", async (req, res) => {
  const { text, source, target } = req.body;

  try {
    const response = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: source === "auto" ? "auto" : source,
      target,
      format: "text"
    }, {
      headers: { "Content-Type": "application/json" }
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error("Translation error:", error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => {
  console.log(Translation server running on http://localhost:${PORT});
});
