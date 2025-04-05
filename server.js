const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public
app.use(express.json());

// API endpoint for translation
app.post('/translate', async (req, res) => {
  try {
    const { text, from, to } = req.body;

    const response = await fetch(https://api-url-here.com?text=${text}&from=${from}&to=${to});
    const data = await response.json();

    res.json({ translatedText: data.translatedText });
  } catch (error) {
    console.error('Translation failed:', error);
    res.status(500).json({ error: 'Translation failed.' });
  }
});

// Fallback: serve index.html for any unknown route (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});
