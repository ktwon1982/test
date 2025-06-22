const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 OpenAI API 키 (보안을 위해 실제 서비스에선 .env 사용 권장)
const OPENAI_API_KEY = "sk-여기에_당신의_API키_입력";

// GET 요청 확인용
app.get("/", (req, res) => {
  res.send("✅ 서버 정상 작동 중 (GET /)");
});

// POST 요청 - GPT 호출
app.post("/", async (req, res) => {
  const message = req.body.message;
  console.log("💬 입력 메시지:", message);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.send(reply);
  } catch (error) {
    console.error("❌ GPT 요청 실패:", error.response?.data || error.message);
    res.status(500).send("GPT 요청 실패: " + (error.response?.data?.error?.message || error.message));
  }
});

// 포트 설정
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 GPT Proxy 서버 실행 중 - 포트 ${PORT}`);
});
