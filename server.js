const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // for frontend files

app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const response = await axios.post('https://libretranslate.com/translate', {
      q: text,
      source: 'auto',
      target: targetLang,
      format: 'text'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.get('/fun-fact', (req, res) => {
  const facts = [
    "Did you know? The word 'robot' comes from a Czech word meaning 'forced labor'.",
    "There are over 7,000 languages in the world today.",
    "Sign language is different in every country!",
    "Mandarin Chinese is the most spoken language in the world.",
    "Emoji is actually a Japanese word meaning 'picture character'."
  ];
  const fact = facts[Math.floor(Math.random() * facts.length)];
  res.json({ fact });
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:${PORT}');
});
