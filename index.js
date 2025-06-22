const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GROQ_API_KEY;

// ✅ 서버 작동 확인용
app.get("/", (req, res) => {
  res.send("✅ Groq GPT 서버 작동 중");
});

// ✅ GPT 요청
app.post("/", async (req, res) => {
  const message = req.body.message;
  console.log("💬 입력 메시지:", message);
  console.log("✅ API Key 로드:", apiKey);

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "mixtral-8x7b-32768", // 또는 llama3-8b-8192
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        max_tokens: 512
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.send(reply);
  } catch (error) {
    console.error("❌ Groq 요청 실패:", error.response?.data || error.message);
    res.status(500).send("Groq 요청 실패: " + JSON.stringify(error.response?.data || error.message));
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
