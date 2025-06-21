import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    imageUrl: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {collation: 'diaries'}
);

export default mongoose.models.Diary || mongoose.model('Diary', DiarySchema);