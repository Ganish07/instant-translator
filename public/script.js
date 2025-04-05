async function translateText() {
    const inputText = document.getElementById("input-text").value;
    const fromLang = document.getElementById("input-lang").value;
    const toLang = document.getElementById("output-lang").value;

    try {
        const response = await fetch("http://localhost:3000/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: inputText,
                from: fromLang,
                to: toLang
            })
        });

        const data = await response.json();
        document.getElementById("output-text").value = data.translatedText || "Translation failed.";
    } catch (err) {
        document.getElementById("output-text").value = "Error connecting to server.";
    }
}
