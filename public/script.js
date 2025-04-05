document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("sourceText").value;
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  try {
    const res = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, source, target }),
    });

    const data = await res.json();
    document.getElementById("translatedText").value = data.translatedText;
  } catch (err) {
    document.getElementById("translatedText").value = "Error connecting to server.";
  }
});

const facts = [
  "There are over 7,000 languages spoken worldwide.",
  "Mandarin Chinese is the most spoken language globally.",
  "The Bible is the most translated book ever.",
  "Some languages don't have words for left and right!",
  "Basque is a language with no known relatives.",
];

document.addEventListener("DOMContentLoaded", () => {
  const random = Math.floor(Math.random() * facts.length);
  document.getElementById("funFact").textContent = facts[random];
});
