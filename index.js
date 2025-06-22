const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// POST / 테스트용
app.post("/", (req, res) => {
  console.log("✅ POST 요청 수신됨:", req.body);
  res.send("✅ POST 요청 성공! 메시지 수신 완료");
});

// GET /도 확인용으로 추가
app.get("/", (req, res) => {
  res.send("✅ 서버 정상 작동 중 (GET /)");
});

// 포트 설정
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 서버가 ${PORT}번 포트에서 실행 중`);
});
