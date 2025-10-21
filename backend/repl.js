import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel() {
  try {
    // Pick a valid model from your list
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // Test prompt
    const result = await model.generateContent("Write a short greeting message.");
    
    // Print the AI response
    console.log("✅ Model output:\n", result.response.text());
  } catch (err) {
    console.error("❌ Error testing model:", err);
  }
}

testModel();
