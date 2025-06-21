import mongoose from "mongoose";
import { NextResponse } from "next/server";

const DiarySchema = new mongoose.Schema({
  title: String,
  content: String,
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

const Diary = mongoose.models.Diary || mongoose.model("Diary", DiarySchema);

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGO_URI);
};

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const diary = await Diary.findById(id);

    if (!diary) {
      return NextResponse.json({ error: "다이어리 없음" }, { status: 404 });
    }

    return NextResponse.json(diary);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    await Diary.findByIdAndDelete(id);
    return NextResponse.json({ message: "삭제 완료" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
