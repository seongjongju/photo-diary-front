// pages/api/images.js
import multer from "multer";
import path from "path";
import fs from "fs";

// 파일 저장 경로 지정
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "public/uploads");

      // 디렉토리 없으면 생성
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

// multer를 Promise 기반으로 감싸기
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // multer 때문에 비활성화
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await runMiddleware(req, res, upload.single("image"));
      return res.status(200).json({ _id: req.file.filename });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "업로드 실패" });
    }
  } else {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
