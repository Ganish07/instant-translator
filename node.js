const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
    const { text, from, to } = req.body;

    try {
        const response = await axios.post('https://libretranslate.com/translate', {
            q: text,
            source: from,
            target: to,
            format: "text"
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        res.json({ translatedText: response.data.translatedText });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Translation failed." });
    }
});

app.listen(3000, () => {
    console.log('Translation server running on http://localhost:3000');
});
