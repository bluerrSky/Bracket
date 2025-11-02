require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      const res2 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
      const data2 = await res2.json();
      console.log("\n✅ Available models (via ?key=...):");
      data2.models?.forEach(m => console.log("-", m.name));
      return;
    }

    const data = await response.json();
    console.log("\n✅ Available models:");
    data.models?.forEach(m => console.log("-", m.name));
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();