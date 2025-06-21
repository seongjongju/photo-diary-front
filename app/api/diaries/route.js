import mongoose from "mongoose"
import { NextResponse } from "next/server";

const DiarySchema = new mongoose.Schema({
  title: String,
  content: String,
  images: [String],
  createdAt: {type: Date, default: Date.now},
});

const Diary = mongoose.models.Diary || mongoose.model("Diary", DiarySchema);

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if(mongoose.connection.readyState >= 1) {
    return;
  };
  return mongoose.connect(MONGO_URI);
};

export const GET = async () => {
  try{
    await connectDB();
    const diaries = await Diary.find().sort({createdAt: -1});
    return NextResponse.json(diaries);
  } catch(err) {
    return NextResponse.json({err: err.message}, {status: 500});
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    const diary = new Diary(body);
    await diary.save();
    return NextResponse.json(diary, {status: 201});
  } catch(err) {
    return NextResponse.json({err: err.message}, {status: 500});
  }
};