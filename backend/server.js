import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are a finance assistant.

Extract transaction details from the message:
"${message}"

Rules:
- Food items (pizza, maggie, burger) → Food
- Clothes, shirt, jeans, t-shirt → Shopping
- Uber, auto, cab → Transport
- Movies, Netflix → Entertainment
- Salary, money received → Income
- If unsure → Other
- If type not mentioned → expense

Return ONLY valid JSON:

{
  "amount": number,
  "category": "Food | Shopping | Transport | Entertainment | Income | Other",
  "type": "income" or "expense",
  "description": string
}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    // clean AI response
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    res.json({ reply: text });

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});