const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/translate", async (req, res) => {
  const { text, source, target } = req.body;

  try {
    const response = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source,
      target,
      format: "text"
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
