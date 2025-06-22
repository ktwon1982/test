const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// OPENAI_API_KEY를 환경변수에서 불러오고, 없으면 수동 입력값 사용
const apiKey = process.env.OPENAI_API_KEY;

app.post("/", async (req, res) => {
  const message = req.body.message;
  console.log("입력 메시지:", message);

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
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    const reply = response.data.choices[0].message.content;
    res.send(reply);
  } catch (error) {
    res.status(500).send("OpenAI 요청 실패: " + error.message);
  }
});

// Render는 PORT를 자동 할당함. 없을 경우 3000 포트 사용
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
