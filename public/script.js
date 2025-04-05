document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("sourceText").value.trim();
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  if (!text) return;

  try {
    const res = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source, target })
    });

    const data = await res.json();
    document.getElementById("translatedText").value = data.translatedText || "Translation failed!";
  } catch (err) {
    document.getElementById("translatedText").value = "Error connecting to server.";
  }
});

async function loadFunFact() {
  const facts = [
    "The longest alphabet is Khmer (Cambodian), with 74 letters!",
    "Did you know? The Bible is the most translated book in the world.",
    "There are over 7,000 spoken languages today.",
    "Basque is a language isolate – no known relatives!",
    "Inuit languages have over 50 words for snow!"
  ];
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  document.getElementById("funFact").textContent = randomFact;
}

window.addEventListener("load", loadFunFact);
