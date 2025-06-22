const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT; // `|| 10000` 제거

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
